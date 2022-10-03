import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { Documentos } from "../../entities/documentos";
import { CustomError } from "../../utils/customError";

const repCatequizando = db.getRepository(Catequizando);
const repDocumentos = db.getRepository(Documentos);

export async function postOne(cat: any, docs: any) {
  try {
    const catequizando = await repCatequizando.save(
      repCatequizando.create(cat)
    );
    docs.catequizando = catequizando;
    const documentos = await repDocumentos.save(repDocumentos.create(docs));
    (documentos as any).catequizando = (catequizando as any).id;
    return { catequizando, documentos };
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
