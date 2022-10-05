import { db } from "../../db";
import { Documentos } from "../../entities/documentos";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Documentos);

export async function getByCatequizando(id: number) {
  try {
    return repository.findOneBy({ catequizando: { id } });
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
