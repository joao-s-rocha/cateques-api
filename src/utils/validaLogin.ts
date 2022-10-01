import { isEmpty } from "lodash";
import { ExpressMiddlewareInterface, HttpError } from "routing-controllers";
import { CustomError } from "./customError";

export class validaLogin implements ExpressMiddlewareInterface {
  async use(req: any, res: any, next: any) {
    const usuario = req.headers.usuario;
    const senha = req.headers.senha;
    const tipo = req.headers.tipo;

    if (isEmpty(usuario) || isEmpty(senha) || isEmpty(tipo))
      throw new CustomError(400, "Login incompleto");

    if (!(usuario == "admin" && senha == "catequese" && tipo == "A")) {
      throw new CustomError(500, "Login inválido");
    }
    next();
  }
}
