import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";

const repository = db.getRepository(Sacramento);

export async function getAll() {
  try {
    return repository.find({ relations: { catequizando: true } });
  } catch (err: any) {
    throw new HttpError(400, "Erro na busca");
  }
}
