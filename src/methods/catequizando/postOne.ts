import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { Documentos } from "../../entities/documentos";
import { CustomError } from "../../utils/customError";

const repCatequizando = db.getRepository(Catequizando);
const repDocumentos = db.getRepository(Documentos);

export async function postOne(cat: any) {
  try {
    return repCatequizando.save(repCatequizando.create(cat));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
