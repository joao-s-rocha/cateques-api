import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Sacramento);

export async function getAll() {
  try {
    return repository.find({ relations: { catequizando: true } });
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca");
  }
}
