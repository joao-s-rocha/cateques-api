import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const repository = db.getRepository(Usuario);

export async function login(params: any) {
  const { login, senha } = params;

  if (isEmpty(login) || isNull(login) || isEmpty(senha) || isNull(senha)) {
    throw new CustomError(404, "Login ou senha inválidos");
  }

  if (login == process.env.USUARIO_PADRAO && senha == process.env.SENHA_PADRAO)
    return {
      token: jwt.sign(
        { tipo: "COORDENADOR", id: 0 },
        process.env.JWT_KEY ?? ""
      ),
    };

  const usuario = await repository.findOneBy({ login });

  if (isEmpty(usuario) || isNull(usuario))
    throw new CustomError(404, "Login ou senha inválidos");

  const verificaSenha = await bcrypt.compare(senha, usuario.senha);

  if (!verificaSenha) throw new CustomError(404, "Login ou senha inválidos");

  const token = jwt.sign(
    { tipo: usuario.tipo, id: usuario.id },
    process.env.JWT_KEY ?? "",
    { expiresIn: "8h" }
  );

  return { id_usuario: usuario.id, token };
}
