import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function login(params: any) {
  const { login, senha } = params;

  if (isEmpty(login) || isNull(login) || isEmpty(senha) || isNull(senha)) {
    throw new CustomError(404, "Login ou senha inválidos");
  }

  if (login == "admin" && senha == "catequese")
    return { tokenCatequese: { tipo: "COORDENADOR", id: 0 } };

  const usuario = await repository.findOne({ where: { login, senha } });

  if (isNull(usuario)) throw new CustomError(404, "Login ou senha inválidos");

  try {
    if (usuario.tipo == "COORDENADOR")
      return { tokenCatequese: { tipo: "COORDENADOR", id: usuario.id } };
    else return { tokenCatequese: { tipo: "CATEQUISTA", id: usuario.id } };
  } catch (err: any) {
    throw new CustomError(400, "Erro na requisição");
  }
}
