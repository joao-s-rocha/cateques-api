import { isEmpty, isNull } from "lodash";
import { HttpCode } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { Catequizando } from "../../entities/catequizando";
import { TurmaCatequizando } from "../../entities/turmaCatequizando";
import { turmaPossuiCatequizando } from "./turmaPossuiCatequizando";
import { CustomError } from "../../utils/customError";

const repTurmaCatequizando = db.getRepository(TurmaCatequizando);
const repCatequizando = db.getRepository(Catequizando);
const repTurma = db.getRepository(Turma);

export async function addCatequizandosToTurma(
  idsCatequizandos: number[],
  idTurma: number
) {
  if (isEmpty(idsCatequizandos))
    throw new CustomError(400, "Catequizandos não informados");

  const turma = await repTurma.findOneBy({ id: idTurma });

  if (await turmaPossuiCatequizando(idsCatequizandos, idTurma))
    throw new CustomError(
      400,
      "Catequizandos já existententes na turma, ou turma inválida"
    );

  if (isEmpty(turma) || isNull(turma))
    throw new CustomError(400, "Turma não encontrada");

  for (const id of idsCatequizandos) {
    const catequizando = await repCatequizando.findOneBy({ id });

    if (!isNull(catequizando)) {
      try {
        await repTurmaCatequizando.save(
          repTurmaCatequizando.create({ catequizando, turma })
        );
      } catch (err: any) {
        throw new CustomError(400, "Erro ao ligar turma com catequizando", err);
      }
    }
  }

  return HttpCode(200);
}
