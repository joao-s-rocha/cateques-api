import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function deleteAll() {
  try {
    return repository.delete({});
  } catch (err: any) {
    throw new HttpError(400, "Erro na requisição");
  }
}