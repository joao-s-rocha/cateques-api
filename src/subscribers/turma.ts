import { isEmpty, isNull } from "lodash";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  LoadEvent,
  UpdateEvent,
} from "typeorm";
import { db } from "../db";
import { Turma } from "../entities/turma";
import { CustomError } from "../utils/customError";
import { dataBrToDate } from "../utils/dataBrToDate";
import { formataDataBr } from "../utils/formataDataBr";
import { validaDataBr } from "../utils/validaDataBr";
import { validate } from "../utils/validaEntity";
import { validarCompletoDataBr } from "../utils/validarCompletoDatabBr";

const repository = db.getRepository(Turma);

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Turma> {
  listenTo() {
    return Turma;
  }

  async beforeInsert(event: InsertEvent<Turma>) {
    if (
      event.entity.data_conclusao &&
      validarCompletoDataBr(event.entity.data_conclusao.toString())
    ) {
      event.entity.data_conclusao = dataBrToDate(
        event.entity.data_conclusao as any
      );
    }
    await validate(event.entity as Turma);
  }

  async beforeUpdate(event: UpdateEvent<Turma>) {
    if (
      event.entity &&
      event.entity.data_conclusao &&
      validarCompletoDataBr(event.entity.data_conclusao.toString())
    ) {
      event.entity.data_conclusao = dataBrToDate(
        event.entity.data_conclusao as any
      );
    }
    await validate(event.entity as Turma);
  }
}
