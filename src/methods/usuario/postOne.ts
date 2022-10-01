import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";

const repository = db.getRepository(Catequizando);

export async function postOne(cat: any) {
  try {
    return repository.save(repository.create(cat));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido");
  }
}
