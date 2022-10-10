import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Documentos } from "../entities/documentos";
import { validate } from "../utils/validaEntity";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Documentos> {
  listenTo() {
    return Documentos;
  }

  async beforeInsert(event: InsertEvent<Documentos>) {
    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Documentos>) {
    await validate(event.entity as Documentos);
  }
}
