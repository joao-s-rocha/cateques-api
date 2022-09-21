import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function getOne(id: number) {
  try {
    return repository.findOneBy({ id });
  } catch (err: any) {
    throw new HttpError(400, "Turma não encontrada");
  }
}
