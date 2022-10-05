import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";

const repository = db.getRepository(Catequizando);

export async function deleteOne(id: number) {
  try {
    return repository.delete({ id });
  } catch (err: any) {
    throw new CustomError(400, "Erro na requisição", err);
  }
}
