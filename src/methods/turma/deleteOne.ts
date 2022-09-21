import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function deleteOne(id: number) {
  try {
    return repository.delete({ id });
  } catch (err: any) {
    throw new HttpError(400, "Erro na requisição");
  }
}
