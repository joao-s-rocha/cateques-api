import { isEmpty } from "lodash";
import { ExpressMiddlewareInterface, HttpError } from "routing-controllers";

export class validaLogin implements ExpressMiddlewareInterface {
  async use(req: any, res: any, next: any) {
    const usuario = req.headers.usuario;
    const senha = req.headers.senha;
    const tipo = req.headers.tipo;

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
