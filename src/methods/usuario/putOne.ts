import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";
import bcrypt from "bcrypt";

const repository = db.getRepository(Usuario);

export async function putOne(id: number, usr: any) {
  const usuario = await repository.findOneBy({ id });

  if (isEmpty(usuario) || isNull(usuario)) {
    throw new CustomError(404, "Usuário não encontrado");
  }

  if (usr.senha) usr.senha = await bcrypt.hash(usr.senha, 10);

  try {
    return repository.save(repository.merge(usuario, usr));
  } catch (err: any) {
    throw new CustomError(400, "Falha na requisição de modificação", err);
  }
}
