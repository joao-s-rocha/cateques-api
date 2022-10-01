import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function getOne(id: number) {
  try {
    return repository.findOneBy({ id });
  } catch (err: any) {
    throw new CustomError(400, "Turma não encontrada");
  }
}
