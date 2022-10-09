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
import { Documentos } from "../entities/documentos";
import { putOne } from "../methods/catequizando/putOne";

const repository = db.getRepository(Sacramento);
const repDocumentos = db.getRepository(Documentos);
const repCatequizando = db.getRepository(Catequizando);

function procuraSacramentoData(
  sacramentos: Sacramento[],
  tipo: string,
  data_inicio: Date
): number {
  return findIndex(sacramentos, function (s) {
    return (
      s.tipo_sacramento == tipo &&
      !isNull(s.data_fechamento) &&
      s.data_fechamento <= data_inicio
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
  if (tipo === "E") {
    const documentos = await repDocumentos.findOne({
      where: {
        vive_maritalmente: "S",
        catequizando: {
          id: catequizando.id,
        },
      },
    });

    if (isNull(documentos))
      return "O sacramento de Eucaristia necessita do Catequizando estar vivendo maritalmente";
  }

  const sacramentos = await repository.find({
    where: {
      catequizando: {
        id: catequizando.id,
      },
    },
  });

  const atual = procuraSacramento(sacramentos, tipo);

  if (atual > -1) return "Este sacramento já existe para o Catequizando";
  else {
    const e = procuraSacramentoData(sacramentos, "E", data_inicio);
    const b = procuraSacramentoData(sacramentos, "B", data_inicio);

    switch (tipo) {
      case "E":
        if (b == -1)
          return (
            "O sacramento de Eucaristia necessita do cumprimento anterior de Batismo. " +
            "E sua data de fechamento deve ser válida com o Batismo"
          );
        break;
      case "C":
        if (b == -1 || e == -1)
          return (
            "O sacramento de Crisma necessita do cumprimento anterior de Batismo e Eucaristia. " +
            "E sua data de fechamento deve ser válida com outros Sacramentos"
          );
        break;
    }
  }

  return "";
}

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Sacramento> {
  listenTo() {
    return Sacramento;
  }

  async beforeInsert(event: InsertEvent<Sacramento>) {
    const sac = event.entity;

    if (
      sac.data_fechamento &&
      validarCompletoDataBr(sac.data_fechamento.toString())
    ) {
      event.entity.data_fechamento = dataBrToDate(sac.data_fechamento as any);
    }

    if (sac.data_inicio && validarCompletoDataBr(sac.data_inicio.toString())) {
      event.entity.data_inicio = dataBrToDate(sac.data_inicio as any);
    }

    if (event.entity.data_fechamento < event.entity.data_inicio)
      throw new CustomError(500, "Data de fechamento menor que data de início");

    const message: string = await validaSacramento(
      sac.tipo_sacramento,
      sac.catequizando,
      event.entity.data_inicio
    );

    if (!(message == "")) throw new CustomError(500, message);

    if (sac.tipo_sacramento === "E" && (sac.nome_madrinha || sac.nome_padrinho))
      throw new CustomError(
        500,
        "Eucaristia não pode receber madrinha ou padrinho"
      );

    if (sac.tipo_sacramento === "C" && event.entity.data_fechamento) {
      sac.catequizando.todos_sac = "S";
      putOne(sac.catequizando.id, sac.catequizando);
    }

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
      if (
        event.entity.tipo_sacramento === "E" &&
        (event.entity.nome_madrinha || event.entity.nome_padrinho)
      )
        throw new CustomError(
          500,
          "Eucaristia não pode receber madrinha ou padrinho"
        );
    }

    await validate(event.entity as Sacramento);
  }
}
