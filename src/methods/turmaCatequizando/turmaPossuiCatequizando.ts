import { db } from "../../db";
import { TurmaCatequizando } from "../../entities/turmaCatequizando";
import { isEmpty, isNull } from "lodash";
import { In } from "typeorm";

const repository = db.getRepository(TurmaCatequizando);

export async function turmaPossuiCatequizando(
  idsCatequizandos: number[],
  idTurma: number
): Promise<Boolean> {
  const turmaCatequizandos = await repository.find({
    where: {
      catequizando: {
        id: In(idsCatequizandos),
      },
      turma: {
        id: idTurma,
      },
    },
  });

  return !(isEmpty(turmaCatequizandos) || isNull(turmaCatequizandos));
}
