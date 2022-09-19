import { HttpError } from "routing-controllers";
import { Repository } from "typeorm";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function getOne(id: number) {
  try {
    return repository.findOneBy({ id });
  } catch (err: any) {
    throw new HttpError(400, "Usuário não encontrado");
  }
}
