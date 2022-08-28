import { HttpError } from "routing-controllers";
import { Repository } from "typeorm";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";

const repository = db.getRepository(Catequizando);

export async function postOne(cat: any) {
  try {
    return await repository.save(repository.create(cat));
  } catch (err: any) {
    throw new HttpError(400, "Registro inválido");
  }
}
