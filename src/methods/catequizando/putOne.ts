import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";

const repository = db.getRepository(Catequizando);

export async function putOne(id: number, sac: any) {
  const catequizando = await repository.findOneBy({ id });

  if (isEmpty(catequizando) || isNull(catequizando)) {
    throw new CustomError(404, "Catequizando não encontrado");
  }

  try {
    return repository.save(repository.merge(catequizando, sac));
  } catch (err: any) {
    throw new CustomError(400, "Falha na requisição de modificação", err);
  }
}
