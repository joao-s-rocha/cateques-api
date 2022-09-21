import { isEmpty, isNull } from "lodash";
import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function putOne(id: number, usr: any) {
  const usuario = await repository.findOneBy({ id });

  if (isEmpty(usuario) || isNull(usuario)) {
    throw new HttpError(404, "Usuário não encontrado");
  }

  try {
    return await repository.save(
      repository.merge(usuario as Usuario, usr as Usuario)
    );
  } catch (err: any) {
    throw new HttpError(400, "Falha na requisição de modificação");
  }
}
