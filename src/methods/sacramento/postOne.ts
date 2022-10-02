import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { Sacramento } from "../../entities/sacramento";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Sacramento);
const repCatequizando = db.getRepository(Catequizando);

export async function postOne(sac: any) {
  try {
    // const cat = repCatequizando.findOneBy(sac.catequizandoId);

    // sac.catequizando = cat;

    return await repository.save(repository.create(sac));
  } catch (err: any) {
    console.log(err);

    throw new CustomError(400, "Registro inválido", err);
  }
}
