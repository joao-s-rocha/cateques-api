import { isArray } from "lodash";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { db } from "../db";
import { Documentos } from "../entities/documentos";
import { validate } from "../utils/validaEntity";

const repository = db.getRepository(Documentos);

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

  async afterLoad(entity: any) {
    if (!isArray(entity)) entity.catequizando = entity.catequizando.id;
  }
}
