import { db } from "../../db";
import { Documentos } from "../../entities/documentos";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Documentos);

export async function deleteOne(id: number) {
  try {
    return repository.delete({ id });
  } catch (err: any) {
    throw new CustomError(400, "Erro ao excluir", err);
  }
}
