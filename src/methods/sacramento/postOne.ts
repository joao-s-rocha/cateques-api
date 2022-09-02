import { HttpError } from "routing-controllers";
import { Repository } from "typeorm";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { Sacramento } from "../../entities/sacramento";

const repository = db.getRepository(Sacramento);
const repCatequizando = db.getRepository(Catequizando);

export async function postOne(sac: any) {
  try {
    // const cat = repCatequizando.findOneBy(sac.catequizandoId);

    // sac.catequizando = cat;

    return await repository.save(repository.create(sac));
  } catch (err: any) {
    console.log(err);

    throw new HttpError(400, "Registro inválido");
  }
}
