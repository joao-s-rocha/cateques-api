import { findIndex } from "lodash";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Sacramento } from "../entities/sacramento";
import { db } from "../db";
import { validate } from "../utils/validaEntity";
import { Catequizando } from "../entities/catequizando";

const repository = db.getRepository(Sacramento);

function procuraSacramento(sacramentos: Sacramento[], tipo: string): number {
  return findIndex(sacramentos, function (s) {
    return s.tipo_sacramento == tipo;
  });
}

async function validaSacramento(
  tipo: string,
  catequizando: Catequizando
): Promise<string> {
  let message: string = "";
  const sacramentos = await repository.find({
    where: {
      catequizando: catequizando,
    },
  });

  const c = procuraSacramento(sacramentos, "C");
  const e = procuraSacramento(sacramentos, "E");
  const b = procuraSacramento(sacramentos, "B");

  switch (tipo) {
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

  return message;
}

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Sacramento> {
  listenTo() {
    return Sacramento;
  }

  async beforeInsert(event: InsertEvent<Sacramento>) {
    const message: string = await validaSacramento(
      event.entity.tipo_sacramento,
      event.entity.catequizando
    );

    if (!(message == "")) throw message;

    await validate(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Sacramento>) {
    await validate(event.entity as Sacramento);
  }

  // async afterLoad(entity: any) {
  //   entity.cliente = entity.cliente.cnpjCpf;
  // }
}
