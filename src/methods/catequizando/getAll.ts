import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Catequizando);

export async function getAll() {
  try {
    return await repository.find();
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
