import { isEmpty, isNull } from "lodash";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { Sacramento } from "../../entities/sacramento";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Sacramento);
const repCatequizando = db.getRepository(Catequizando);

export async function postOne(id: number, sac: Sacramento) {
  try {
    const cat = await repCatequizando.findOneBy({ id });

    if (isNull(cat)) throw new CustomError(404, "Catequizando não encontrado");

    sac.catequizando = cat;

    return await repository.save(repository.create(sac));
  } catch (err: any) {
    throw new CustomError(400, "Registro inválido", err);
  }
}
