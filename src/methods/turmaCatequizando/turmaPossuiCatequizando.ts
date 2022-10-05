import { db } from "../../db";
import { TurmaCatequizando } from "../../entities/turmaCatequizando";
import { isEmpty, isNull } from "lodash";

export async function turmaPossuiCatequizando(
  idsCatequizandos: number[],
  idTurmaCatequizando: number
): Promise<Boolean> {
  const catequizandoTurma = await db
    .getRepository(TurmaCatequizando)
    .createQueryBuilder("turma")
    .where("turma.id = :id AND turma.catequizandoId in (:catequizandos)", {
      id: idTurmaCatequizando,
      catequizandos: idsCatequizandos.toString(),
    })
    .getOne();

  return !(isEmpty(catequizandoTurma) || isNull(catequizandoTurma));
}
