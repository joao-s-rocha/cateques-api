import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { formataDataBr } from "../../utils/formataDataBr";

const repository = db.getRepository(Turma);

export async function putOne(id: number, tur: any) {
  const turma = await repository.findOneBy({ id });

  if (isEmpty(turma) || isNull(turma)) {
    throw new CustomError(404, "Turma não encontrada");
  }

  try {
    return repository.save(repository.merge(turma, tur));
  } catch (err: any) {
    throw new CustomError(400, "Falha na requisição de modificação", err);
  }
}
