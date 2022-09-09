import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";

const repository = db.getRepository(Catequizando);

export async function postMany(cat: any) {
  try {
    return repository.save(repository.create(cat));
  } catch (err: any) {
    throw new HttpError(400, "Registro inválido");
  }
}
