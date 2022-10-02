import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Sacramento);

export async function deleteAll() {
  try {
    return repository.delete({});
  } catch (err: any) {
    throw new CustomError(400, "Erro ao excluir", err);
  }
}
