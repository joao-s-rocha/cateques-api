import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function putOne(id: number, usr: any) {
  const usuario = await repository.findOneBy({ id });

  if (isEmpty(usuario) || isNull(usuario)) {
    throw new CustomError(404, "Usuário não encontrado");
  }

  try {
    return await repository.save(
      repository.merge(usuario as Turma, usr as Turma)
    );
  } catch (err: any) {
    throw new CustomError(400, "Falha na requisição de modificação");
  }
}
