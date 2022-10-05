import { db } from "../../db";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { isEmpty, isNull } from "lodash";
import { In } from "typeorm";

const repository = db.getRepository(TurmaCatequista);

export async function turmaPossuiCatequistas(
  idsUsuarios: number[],
  idTurmaCatequista: number
): Promise<Boolean> {
  // const usuarioTurma = await db
  //   .getRepository(TurmaCatequista)
  //   .createQueryBuilder("turma")
  //   .where("turma.id = :id AND turma.usuarioId in (:usuarios)", {
  //     id: idTurmaCatequista,
  //     usuarios: idsUsuarios.toString(),
  //   })
  //   .getOne();

  const turmaCatequistas = await repository.find({
    where: {
      usuario: {
        id: In(idsUsuarios),
      },
      turma: {
        id: idTurmaCatequista,
      },
    },
  });

  return !(isEmpty(turmaCatequistas) || isNull(turmaCatequistas));
}
