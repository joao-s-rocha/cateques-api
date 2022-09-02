import { HttpError } from "routing-controllers";
import { Repository } from "typeorm";
import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";

const repository = db.getRepository(Sacramento);

export async function postOne(cat: any) {
  try {
    return await repository.save(repository.create(cat));
  } catch (err: any) {
    throw new HttpError(400, "Registro inválido");
  }
}
