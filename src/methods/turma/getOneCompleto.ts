import { isEmpty, isNull } from "lodash";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { Turma } from "../../entities/turma";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { TurmaCatequizando } from "../../entities/turmaCatequizando";
import { Usuario } from "../../entities/usuario";
import { CustomError } from "../../utils/customError";

const repTurma = db.getRepository(Turma);
const repTurmaCatequista = db.getRepository(TurmaCatequista);
const repTurmaCatequizando = db.getRepository(TurmaCatequizando);

export async function getOneCompleto(id: number) {
  const turma = (await repTurma.findOneBy({ id })) as any;

  if (isNull(turma) || isEmpty(turma))
    throw new CustomError(400, "Turma não encontrada");

  try {
    const catequistas = await repTurmaCatequista.find({
      relations: { usuario: true },
      where: {
        turma: {
          id: turma.id,
        },
      },
    });

    let finalCatequistas: Usuario[] = [];

    for (const thisCatequista of catequistas) {
      const { usuario } = thisCatequista;
      finalCatequistas.push(usuario);
    }

    const catequizandos = await repTurmaCatequizando.find({
      relations: { catequizando: true },
      where: {
        turma: {
          id: turma.id,
        },
      },
    });

    let finalCatequizandos: Catequizando[] = [];

    for (const thisCatequizando of catequizandos) {
      const { catequizando } = thisCatequizando;
      finalCatequizandos.push(catequizando);
    }

    turma.catequizando = finalCatequizandos;
    turma.catequistas = finalCatequistas;

    return turma;
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
