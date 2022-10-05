import {
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Catequizando } from "../entities/catequizando";
import { CustomError } from "../utils/customError";
import { dataBrToDate } from "../utils/dataBrToDate";
import { validaDataBr } from "../utils/validaDataBr";
import { validate } from "../utils/validaEntity";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Catequizando> {
  listenTo() {
    return Catequizando;
  }

  async beforeInsert(event: InsertEvent<Catequizando>) {
    if (event.entity.data_nascimento) {
      if (!validaDataBr(event.entity.data_nascimento.toString()))
        throw new CustomError(500, "Data inválida", {
          value: event.entity.data_nascimento,
        });
      event.entity.data_nascimento = dataBrToDate(
        event.entity.data_nascimento as any
      );
    }

    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Catequizando>) {
    if (event.entity && event.entity.data_nascimento) {
      if (validaDataBr(event.entity.data_nascimento.toString())) {
        event.entity.data_nascimento = dataBrToDate(
          event.entity.data_nascimento as any
        );
      }
    }

    await validate(event.entity as Catequizando);
  }
}
