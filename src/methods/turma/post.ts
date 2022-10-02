import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function post(tur: any) {
  try {
    return repository.save(repository.create(tur));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
