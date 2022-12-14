import { isEmpty, isNull } from "lodash";
import { HttpCode } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { Usuario } from "../../entities/usuario";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { turmaPossuiCatequistas } from "./turmaPossuiCatequistas";
import { CustomError } from "../../utils/customError";

const repTurmaCatequista = db.getRepository(TurmaCatequista);
const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);

export async function addCatequistasToTurma(
  idsUsuarios: number[],
  idTurma: number
) {
  if (isEmpty(idsUsuarios))
    throw new CustomError(400, "Usuarios não informados");

  if (await turmaPossuiCatequistas(idsUsuarios, idTurma))
    throw new CustomError(
      400,
      "Catequistas já existententes na turma, ou turma inválida"
    );

  const turma = await repTurma.findOneBy({ id: idTurma });

  if (isEmpty(turma) || isNull(turma))
    throw new CustomError(400, "Turma não encontrada");

  for (const id of idsUsuarios) {
    const usuario = await repUsuario.findOneBy({ id });

    if (!isNull(usuario)) {
      try {
        await repTurmaCatequista.save(
          repTurmaCatequista.create({ usuario, turma })
        );
      } catch (err: any) {
        throw new CustomError(400, "Erro ao ligar turma com catequizando", err);
      }
    }
  }

  return HttpCode(200);
}
