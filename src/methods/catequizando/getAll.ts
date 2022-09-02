import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";

const repository = db.getRepository(Catequizando);

export async function getAll() {
  try {
    return repository.find();
  } catch (err: any) {
    throw new HttpError(400, "Erro na busca");
  }
}
