import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function getAll() {
  try {
    return repository.find();
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca");
  }
}
