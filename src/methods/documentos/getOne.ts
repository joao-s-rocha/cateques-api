import { db } from "../../db";
import { Documentos } from "../../entities/documentos";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Documentos);

export async function getOne(id: number) {
  try {
    return repository.findOneBy({ id });
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
