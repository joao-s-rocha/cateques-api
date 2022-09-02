import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";

const repository = db.getRepository(Sacramento);

export async function getOne(id: number) {
  try {
    return await repository.findOneBy({ id });
  } catch (err: any) {
    throw new HttpError(400, "Erro na busca");
  }
}
