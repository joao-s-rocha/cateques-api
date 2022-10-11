import { isNull } from "lodash";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { TurmaCatequizando } from "../../entities/turmaCatequizando";
import { Usuario } from "../../entities/usuario";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(TurmaCatequizando);
const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);

export async function deleteOne(turmaId: number, catequizandoId: number) {
  const catequizando = await repUsuario.findOneBy({ id: catequizandoId });
  const turma = await repTurma.findOneBy({ id: turmaId });

  if (isNull(catequizando) || isNull(turma))
    throw new CustomError(400, "Turma ou Usuário não encontrados");

  try {
    const turmaCatequizando = await repository.findOneByOrFail({
      catequizando: {
        id: catequizando.id,
      },
      turma: {
        id: turma.id,
      },
    });
    return repository.delete({ id: turmaCatequizando.id });
  } catch (err: any) {
    throw new CustomError(400, "Erro na requisição", err);
  }
}
