import { findIndex } from "lodash";
import { HttpError } from "routing-controllers";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Sacramento } from "../entities/sacramento";
//   import { validate } from "../util";
import { db } from "../db";

const repository = db.getRepository(Sacramento);

function procuraSacramento(sacramentos: Sacramento[], tipo: string): number {
  return findIndex(sacramentos, function (s) {
    return s.tipo_sacramento == tipo;
  });
}

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Sacramento> {
  listenTo() {
    return Sacramento;
  }

  async beforeInsert(event: InsertEvent<Sacramento>) {
    const sac = event.entity.tipo_sacramento;

    const sacramentos = await repository.find({
      where: {
        catequizando: event.entity.catequizando,
      },
    });

    const c = procuraSacramento(sacramentos, "C");
    const e = procuraSacramento(sacramentos, "E");
    const b = procuraSacramento(sacramentos, "B");

    let message: string = "";

    switch (sac) {
      case "E":
        if (c == -1)
          message =
            "O sacramento de Eucaristia necessita do cumprimento anterior da Crisma";
        break;
      case "B":
        if (b == -1)
          message = "O sacramento de Batismo já existe para esse Catequizando";
        break;
      case "C":
        if (b == -1 || e == -1)
          message =
            "O sacramento de Crisma necessita do cumprimento anterior de Batismo e Eucaristia";
        break;
    }

    if (!(message == "")) throw new HttpError(500, message);
  }

  async beforeUpdate(event: UpdateEvent<Sacramento>) {
    //   await validate(event.entity as Sacramento);
  }

  async afterLoad(entity: any) {
    entity.cliente = entity.cliente.cnpjCpf;
  }
}
