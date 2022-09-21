import { isEmpty, isNull } from "lodash";
import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

export async function putOne(id: number, usr: any) {
  const usuario = await repository.findOneBy({ id });

  if (isEmpty(usuario) || isNull(usuario)) {
    throw new HttpError(404, "Usuário não encontrado");
  }

  try {
    return await repository.save(
      repository.merge(usuario as Turma, usr as Turma)
    );
  } catch (err: any) {
    throw new HttpError(400, "Falha na requisição de modificação");
  }
}
