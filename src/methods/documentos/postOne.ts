import { isEmpty, isNull } from "lodash";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { Documentos } from "../../entities/documentos";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Documentos);
const repCatequizando = db.getRepository(Catequizando);

export async function postOne(id: number, doc: Documentos) {
  const cat = await repCatequizando.findOneBy({ id });

  if (isNull(cat)) throw new CustomError(404, "Catequizando não encontrado");

  doc.catequizando = cat;
  try {
    return repository.save(repository.create(doc));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
