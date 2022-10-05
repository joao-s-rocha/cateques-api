import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Documentos } from "../../entities/documentos";

const repository = db.getRepository(Documentos);

export async function putOne(id: number, sac: any) {
  const documento = await repository.findOneBy({ id });

  if (isEmpty(documento) || isNull(documento)) {
    throw new CustomError(404, "Documento não encontrado");
  }

  try {
    return repository.save(repository.merge(documento, sac));
  } catch (err: any) {
    throw new CustomError(400, "Falha na requisição de modificação", err);
  }
}
