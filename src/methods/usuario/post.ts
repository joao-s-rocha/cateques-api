import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function post(usr: Usuario) {
  try {
    // usr.senha = bcrypt.encrypt(usr.senha);
    return repository.save(repository.create(usr));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
