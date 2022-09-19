import { isEmpty, isNull } from "lodash";
import { HttpError } from "routing-controllers";
import {
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { db } from "../db";
import { Usuario } from "../entities/usuario";
import { validate } from "../utils/validaEntity";

const repository = db.getRepository(Usuario);

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Usuario> {
  listenTo() {
    return Usuario;
  }

  async beforeInsert(event: InsertEvent<Usuario>) {
    if (!isEmpty(event.entity.tipo) && event.entity.tipo === "COORD") {
      const coordenador = await repository.findBy({ tipo: "COORD" });

      if (
        !(isEmpty(coordenador) || isNull(coordenador)) &&
        event.entity.tipo === "COORD"
      )
        throw new HttpError(400, "Coordenador já cadastrado");
    }
    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Usuario>) {
    await validate(event.entity as Usuario);
  }

  async afterLoad(entity: any) {
    entity.cliente = entity.cliente.cnpjCpf;
  }
}
