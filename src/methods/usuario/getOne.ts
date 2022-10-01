import { CustomError } from "../../utils/customError";
import { Repository } from "typeorm";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function getOne(id: number) {
  try {
    return repository.findOneBy({ id });
  } catch (err: any) {
    throw new CustomError(400, "Usuário não encontrado");
  }
}
