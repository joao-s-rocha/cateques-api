import { isEmpty, isNull } from "lodash";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { db } from "../db";
import { Turma } from "../entities/turma";
import { CustomError } from "../utils/customError";
import { dataBrToDate } from "../utils/dataBrToDate";
import { formataDataBr } from "../utils/formataDataBr";
import { validaDataBr } from "../utils/validaDataBr";
import { validate } from "../utils/validaEntity";

const repository = db.getRepository(Turma);

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Turma> {
  listenTo() {
    return Turma;
  }

  async beforeInsert(event: InsertEvent<Turma>) {
    if (event.entity.data_conclusao) {
      if (!validaDataBr(event.entity.data_conclusao as any))
        throw new CustomError(400, "Erro na validação da classe", {
          value: event.entity.data_conclusao,
          error: "Data de nascimento inválida",
        });

      event.entity.data_conclusao = dataBrToDate(
        event.entity.data_conclusao as any
      );
    }

    await validate(event.entity as Turma);
  }

  async beforeUpdate(event: UpdateEvent<Turma>) {
    await validate(event.entity as Turma);
  }

  async afterLoad(entity: any) {
    if (entity.data_conclusao)
      entity.data_conclusao = formataDataBr(entity.data_conclusao);

    if (entity.data_cad) entity.data_cad = formataDataBr(entity.data_cad);
  }
}
