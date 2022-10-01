import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Catequizando);

export async function getOne(id: number) {
  try {
    return await repository.findOneBy({ id });
  } catch (err: any) {
    throw new CustomError(400, "Catequizando não encontrado");
  }
}
