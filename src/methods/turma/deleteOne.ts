import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function deleteOne(id: number) {
  try {
    return repository.delete({ id });
  } catch (err: any) {
    throw new CustomError(400, "Erro na requisição", err);
  }
}
