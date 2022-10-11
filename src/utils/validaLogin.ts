import { isEmpty, isNull } from "lodash";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { CustomError } from "./customError";

export class validaLoginCoordenador implements ExpressMiddlewareInterface {
  async use(req: any, res: any, next: any) {
    const auth = (req.headers.authorization as string).split(" ").slice(1);

    console.log(auth);

    if (isEmpty(req.body.token_catequese) || isNull(req.body.token_catequese))
      throw new CustomError(400, "Token não encontrado");

    const tipo = req.body.token_catequese.tipo;
    const id = req.body.token_catequese.id;

    if (!tipo || !id) throw new CustomError(400, "Token incompleto");

    if (!(tipo == "COORDENADOR")) {
      throw new CustomError(403, "Sem permissão para essa requisição");
    }
    next();
  }
}
