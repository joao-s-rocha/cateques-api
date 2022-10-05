import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";

const repository = db.getRepository(Sacramento);

export async function putOne(id: number, sac: any) {
  const sacramento = await repository.findOneBy({ id });

  if (isEmpty(sacramento) || isNull(sacramento)) {
    throw new CustomError(404, "Sacramento não encontrado");
  }

  try {
    return repository.save(repository.merge(sacramento, sac));
  } catch (err: any) {
    throw new CustomError(400, "Falha na requisição de modificação", err);
  }
}
