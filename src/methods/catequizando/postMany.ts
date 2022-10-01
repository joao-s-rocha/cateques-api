import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Catequizando);

export async function postMany(cat: any) {
  try {
    return repository.save(repository.create(cat));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido");
  }
}
