import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function getAll() {
  try {
    return repository.find();
  } catch (err: any) {
    throw new HttpError(400, "Erro na busca");
  }
}
