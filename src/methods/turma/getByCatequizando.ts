import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { Catequizando } from "../../entities/catequizando";
import { TurmaCatequizando } from "../../entities/turmaCatequizando";

const repCatequizando = db.getRepository(Catequizando);
const repTurmaCatequizando = db.getRepository(TurmaCatequizando);

export async function getByCatequizando(id: number) {
  const catequizando = await repCatequizando.findOneBy({ id });

  if (isEmpty(catequizando) || isNull(catequizando))
    throw new CustomError(400, "Usuario não encontrado");

  const turmas = await repTurmaCatequizando.find({
    select: {
      data_cad: false,
      id: false,
    },
    relations: {
      turma: true,
    },
    where: {
      catequizando: {
        id,
      },
    },
  });

  const finalTurmas: Turma[] = [];

  for (const value of turmas) {
    const { turma } = value;
    finalTurmas.push(turma);
  }

  return finalTurmas;
}
