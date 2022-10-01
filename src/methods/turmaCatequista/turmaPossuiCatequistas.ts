import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { Usuario } from "../../entities/usuario";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { isEmpty, isNull } from "lodash";

const repTurmaCatequista = db.getRepository(TurmaCatequista);
const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);

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

  console.log(usuarioTurma);

  return !(isEmpty(usuarioTurma) || isNull(usuarioTurma));
}
