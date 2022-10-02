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
    if (!validaDataBr(event.entity.data_nascimento as any))
      throw new CustomError(400, "Erro na validação da classe", {
        value: event.entity.data_nascimento,
        error: "Data de nascimento inválida",
      });

    event.entity.data_nascimento = dataBrToDate(
      event.entity.data_nascimento as any
    );

    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Catequizando>) {
    await validate(event.entity as Catequizando);
  }

  // async afterLoad(entity: any) {
  //   entity.cliente = entity.cliente.cnpjCpf;
  // }
}
