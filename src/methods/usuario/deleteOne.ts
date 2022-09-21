import { HttpError } from "routing-controllers";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function deleteOne(id: number) {
  try {
    return repository.delete({ id });
  } catch (err: any) {
    throw new HttpError(400, "Erro na requisição");
  }
}
