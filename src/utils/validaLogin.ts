import { isEmpty, isNull } from "lodash";
import { ExpressMiddlewareInterface, HttpError } from "routing-controllers";

export function validaLoginAntigo(req: any) {
  const { login, senha, tipo } = req.header;

  if (!(isEmpty(login) || isEmpty(senha) || isEmpty(tipo))) {
    throw new HttpError(400, "Login incompleto");
  }

  if (!(login === "admin" && senha === "catequese" && tipo === "A")) {
    throw new HttpError(500, "Login inválido");
  }

  return true;
}

export class validaLogin implements ExpressMiddlewareInterface {
  async use(req: any, res: any, next: any) {
    // console.log(req.headers.login);

    // if (isNull(req.headers.login) || isEmpty(req.headers.login)) {
    //   console.log("exceção 1");

    //   throw new HttpError(400, "Login vazio");
    // }

    const usuario = req.headers.usuario;
    const senha = req.headers.senha;
    const tipo = req.headers.tipo;
    // const { usuario, senha, tipo } = req.headers.login;

    console.log({ usuario, senha, tipo });

    if (isEmpty(usuario) || isEmpty(senha) || isEmpty(tipo)) {
      console.log("exceção 2");
      throw new HttpError(400, "Login incompleto");
    }

    if (!(usuario == "admin" && senha == "catequese" && tipo == "A")) {
      console.log("exceção 3");
      throw new HttpError(500, "Login inválido");
    }
    next();
  }
}
