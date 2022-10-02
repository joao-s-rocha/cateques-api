import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Turma);

export async function deleteAll() {
  try {
    return repository.delete({});
  } catch (err: any) {
    throw new CustomError(400, "Erro na requisição", err);
  }
}
