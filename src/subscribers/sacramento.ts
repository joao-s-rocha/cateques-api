import { findIndex, isNull } from "lodash";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Sacramento } from "../entities/sacramento";
import { db } from "../db";
import { validate } from "../utils/validaEntity";
import { Catequizando } from "../entities/catequizando";
import { CustomError } from "../utils/customError";
import { dataBrToDate } from "../utils/dataBrToDate";
import { validarCompletoDataBr } from "../utils/validarCompletoDatabBr";

const repository = db.getRepository(Sacramento);

function procuraSacramentoData(
  sacramentos: Sacramento[],
  tipo: string,
  data_inicio: Date
): number {
  return findIndex(sacramentos, function (s) {
    return (
      s.tipo_sacramento == tipo &&
      !isNull(s.data_fechamento) &&
      s.data_fechamento > data_inicio
    );
  });
}

function procuraSacramento(sacramentos: Sacramento[], tipo: string): number {
  return findIndex(sacramentos, function (s) {
    return s.tipo_sacramento == tipo;
  });
}

async function validaSacramento(
  tipo: string,
  catequizando: Catequizando,
  data_inicio: Date
): Promise<string> {
  let message: string = "";
  const sacramentos = await repository.find({
    where: {
      catequizando: {
        id: catequizando.id,
      },
    },
  });

  const atual = procuraSacramento(sacramentos, tipo);

  if (atual > -1) message = "Este sacramento já existe para o Catequizando";
  else {
    const e = procuraSacramentoData(sacramentos, "E", data_inicio);
    const b = procuraSacramentoData(sacramentos, "B", data_inicio);

    switch (tipo) {
      case "E":
        if (b == -1)
          message =
            "O sacramento de Eucaristia necessita do cumprimento anterior de Batismo. " +
            "E sua data de fechamento deve ser válida com o Batismo";
        break;
      case "C":
        if (b == -1 || e == -1)
          message =
            "O sacramento de Crisma necessita do cumprimento anterior de Batismo e Eucaristia. " +
            "E sua data de fechamento deve ser válida com outros Sacramentos";
        break;
    }
  }

  return message;
}

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Sacramento> {
  listenTo() {
    return Sacramento;
  }

  async beforeInsert(event: InsertEvent<Sacramento>) {
    if (
      event.entity.data_fechamento &&
      validarCompletoDataBr(event.entity.data_fechamento.toString())
    ) {
      event.entity.data_fechamento = dataBrToDate(
        event.entity.data_fechamento as any
      );
    }

    if (
      event.entity.data_inicio &&
      validarCompletoDataBr(event.entity.data_inicio.toString())
    ) {
      event.entity.data_inicio = dataBrToDate(event.entity.data_inicio as any);
    }

    if (event.entity.data_fechamento < event.entity.data_inicio)
      throw new CustomError(500, "Data de fechamento menor que data de início");

    const message: string = await validaSacramento(
      event.entity.tipo_sacramento,
      event.entity.catequizando,
      event.entity.data_inicio
    );

    if (!(message == "")) throw new CustomError(500, message);

    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Sacramento>) {
    if (event.entity) {
      if (
        event.entity.tipo_sacramento &&
        event.entity.tipo_sacramento != event.databaseEntity.tipo_sacramento
      )
        throw new CustomError(
          500,
          "Não é permitido alterar o tipo de sacramento"
        );

      if (
        event.entity.data_fechamento &&
        validarCompletoDataBr(event.entity.data_fechamento.toString())
      ) {
        event.entity.data_fechamento = dataBrToDate(
          event.entity.data_fechamento as any
        );
      }

      if (
        event.entity.data_inicio &&
        validarCompletoDataBr(event.entity.data_inicio.toString())
      ) {
        event.entity.data_inicio = dataBrToDate(
          event.entity.data_inicio as any
        );
      }
    }

    await validate(event.entity as Sacramento);
  }
}
