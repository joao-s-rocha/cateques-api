import { db } from "../../db";
import { Documentos } from "../../entities/documentos";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Documentos);

export async function getAll() {
  try {
    return repository.find({ relations: { catequizando: true } });
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
