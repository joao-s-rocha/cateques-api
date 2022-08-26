import { HttpError } from "routing-controllers";
import { Repository } from "typeorm";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";

const repository = db.getRepository(Catequizando);

export async function getOne(id: number) {
  try {
    return await repository.findOneBy({ id });
  } catch (err: any) {
    throw new HttpError(400, "Catequizando não encontrado");
  }
}
