import { isEmpty, isNull } from "lodash";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { db } from "../db";
import { Usuario } from "../entities/usuario";
import { CustomError } from "../utils/customError";
import { formataDataBr } from "../utils/formataDataBr";
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
        throw new CustomError(400, "Coordenador já cadastrado");
    }
    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Usuario>) {
    await validate(event.entity as Usuario);
  }

  async afterLoad(entity: any) {
    if (entity.data_nascimento)
      entity.data_nascimento = formataDataBr(entity.data_nascimento);

    if (entity.data_cad) entity.data_cad = formataDataBr(entity.data_cad);
  }
}
