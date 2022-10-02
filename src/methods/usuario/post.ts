import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function post(cat: any) {
  try {
    return repository.save(repository.create(cat));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
