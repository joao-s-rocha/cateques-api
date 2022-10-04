import { isEmpty } from "lodash";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { CustomError } from "./customError";

export class validaLogin implements ExpressMiddlewareInterface {
  async use(req: any, res: any, next: any) {
    const tipo = req.headers.tipo;
    const id = req.headers.id;

    if (isEmpty(tipo) || isEmpty(id))
      throw new CustomError(400, "Login incompleto");

    if (!(tipo == "COORDENADOR" || tipo == "CATEQUISTA")) {
      throw new CustomError(500, "Login inválido");
    }
    next();
  }
}
