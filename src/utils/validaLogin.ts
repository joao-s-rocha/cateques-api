import { isEmpty, isNull } from "lodash";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { CustomError } from "./customError";
import jwt from "jsonwebtoken";
import { Usuario } from "../entities/usuario";
import { db } from "../db";

type JwtPayLoad = {
  id: number;
  tipo: string;
};

const repository = db.getRepository(Usuario);

export class validaLoginCoordenador implements ExpressMiddlewareInterface {
  async use(req: any, res: any, next: any) {
    const { authorization } = req.headers;

    if (!authorization) throw new CustomError(400, "Token não encontrado");

    const token = authorization.split(" ")[1];

    const { id, tipo } = jwt.verify(
      token,
      process.env.JWT_KEY ?? ""
    ) as JwtPayLoad;

    if (isNull(id) || isNull(tipo))
      throw new CustomError(400, "Token incompleto");

    if (id !== 0) {
      const usuario = await repository.findOneBy({ id });

      if (!usuario)
        throw new CustomError(400, "Usuario nao encontrado pelo Token");
    }

    if (!(tipo == "COORDENADOR"))
      throw new CustomError(403, "Sem permissão para essa requisição");

    next();
  }
}
