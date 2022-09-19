import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function post(cat: any) {
  try {
    return repository.save(repository.create(cat));
  } catch (err: any) {
    throw new HttpError(400, "Registro inválido");
  }
}
