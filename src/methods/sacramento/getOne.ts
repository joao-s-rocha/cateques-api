import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Sacramento);

export async function getOne(id: number) {
  try {
    return await repository.findOneBy({ id });
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
