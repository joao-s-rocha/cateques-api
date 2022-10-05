import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Sacramento);

export async function getByCatequizando(id: number) {
  try {
    return repository.findBy({ catequizando: { id } });
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
