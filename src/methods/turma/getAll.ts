import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function getAll() {
  try {
    return repository.find();
  } catch (err: any) {
    throw new HttpError(400, "Erro na busca");
  }
}
