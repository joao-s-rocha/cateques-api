import { db } from "../../db";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { isEmpty, isNull } from "lodash";

export async function turmaPossuiCatequistas(
  idsUsuarios: number[],
  idTurmaCatequista: number
): Promise<Boolean> {
  const usuarioTurma = await db
    .getRepository(TurmaCatequista)
    .createQueryBuilder("turma")
    .where("turma.id = :id AND turma.usuarioId in (:usuarios)", {
      id: idTurmaCatequista,
      usuarios: idsUsuarios.toString(),
    })
    .getOne();

  return !(isEmpty(usuarioTurma) || isNull(usuarioTurma));
}
