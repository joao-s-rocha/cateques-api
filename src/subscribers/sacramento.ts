import { findIndex } from "lodash";
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
import { formataDataBr } from "../utils/formataDataBr";
import { CustomError } from "../utils/customError";
import { validaDataBr } from "../utils/validaDataBr";
import { dataBrToDate } from "../utils/dataBrToDate";

const repository = db.getRepository(Sacramento);

function procuraSacramento(sacramentos: Sacramento[], tipo: string): number {
  return findIndex(sacramentos, function (s) {
    return s.tipo_sacramento == tipo;
  });
}

async function validaSacramento(
  tipo: string,
  catequizando: Catequizando
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
    const e = procuraSacramento(sacramentos, "E");
    const b = procuraSacramento(sacramentos, "B");

    switch (tipo) {
      case "E":
        if (b == -1)
          message =
            "O sacramento de Eucaristia necessita do cumprimento anterior de Batismo";
        break;
      case "C":
        if (b == -1 || e == -1)
          message =
            "O sacramento de Crisma necessita do cumprimento anterior de Batismo e Eucaristia";
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
    if (event.entity.data_fechamento) {
      if (!validaDataBr(event.entity.data_fechamento.toString()))
        throw new CustomError(500, "Data inválida", {
          value: event.entity.data_fechamento,
        });
      event.entity.data_fechamento = dataBrToDate(
        event.entity.data_fechamento as any
      );
    }

    if (event.entity.data_inicio) {
      if (!validaDataBr(event.entity.data_inicio.toString()))
        throw new CustomError(500, "Data inválida", {
          value: event.entity.data_inicio,
        });
      event.entity.data_inicio = dataBrToDate(event.entity.data_inicio as any);
    }

    const message: string = await validaSacramento(
      event.entity.tipo_sacramento,
      event.entity.catequizando
    );

    if (!(message == "")) throw new CustomError(500, message);

    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Sacramento>) {
    await validate(event.entity as Sacramento);
  }
}
