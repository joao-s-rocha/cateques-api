import { isEmpty } from "lodash";
import { HttpError } from "routing-controllers";

export function validaLogin(req: any) {
  const { login, senha, tipo } = req.header.user;

  if (!(isEmpty(login) || isEmpty(senha) || isEmpty(tipo))) {
    throw new HttpError(400, "Login incompleto");
  }

  if (!(login === "admin" && senha === "catequese" && tipo === "A")) {
    throw new HttpError(500, "Login inválido");
  }

  return true;
}
