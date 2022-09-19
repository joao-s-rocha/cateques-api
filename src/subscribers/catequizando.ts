import {
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Catequizando } from "../entities/catequizando";
import { validate } from "../utils/validaEntity";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Catequizando> {
  listenTo() {
    return Catequizando;
  }

  async beforeInsert(event: InsertEvent<Catequizando>) {
    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Catequizando>) {
    await validate(event.entity as Catequizando);
  }

  async afterLoad(entity: any) {
    entity.cliente = entity.cliente.cnpjCpf;
  }
}
