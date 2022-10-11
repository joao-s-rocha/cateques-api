import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";
import bcrypt from "bcrypt";

const repository = db.getRepository(Usuario);

export async function post(usr: Usuario) {
  try {
    usr.senha = await bcrypt.hash(usr.senha, 10);
    return repository.save(repository.create(usr));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
