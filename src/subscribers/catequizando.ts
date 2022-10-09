import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Catequizando } from "../entities/catequizando";
import { dataBrToDate } from "../utils/dataBrToDate";
import { validate } from "../utils/validaEntity";
import { validarCompletoDataBr } from "../utils/validarCompletoDatabBr";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Catequizando> {
  listenTo() {
    return Catequizando;
  }

  async beforeInsert(event: InsertEvent<Catequizando>) {
    if (
      event.entity.data_nascimento &&
      validarCompletoDataBr(event.entity.data_nascimento.toString())
    ) {
      event.entity.data_nascimento = dataBrToDate(
        event.entity.data_nascimento as any
      );
    }

    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Catequizando>) {
    if (
      event.entity &&
      event.entity.data_nascimento &&
      validarCompletoDataBr(event.entity.data_nascimento.toString())
    ) {
      event.entity.data_nascimento = dataBrToDate(
        event.entity.data_nascimento as any
      );
    }

    await validate(event.entity as Catequizando);
  }
}
