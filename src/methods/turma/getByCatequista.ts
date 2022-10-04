import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { isEmpty, isNull } from "lodash";

export async function getByCatequista(
  idsUsuarios: number[],
  idTurmaCatequista: number
): Promise<Boolean> {
  const usuarioTurma = await db
    .getRepository(Turma)
    .createQueryBuilder("turma")
    .leftJoin("turma.catequistaId", "Usuario")
    .leftJoin("turma.catequistaId", "Usuario")
    .where("turma.id = :id AND turma.usuarioId in (:usuarios)", {
      id: idTurmaCatequista,
      usuarios: idsUsuarios.toString(),
    })
    .getOne();

  console.log(usuarioTurma);

  return !(isEmpty(usuarioTurma) || isNull(usuarioTurma));
}
