import { isNull } from "lodash";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { Usuario } from "../../entities/usuario";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(TurmaCatequista);
const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);

export async function deleteOne(turmaId: number, usuarioId: number) {
  const usuario = await repUsuario.findOneBy({ id: usuarioId });
  const turma = await repTurma.findOneBy({ id: turmaId });

  if (isNull(usuario) || isNull(turma))
    throw new CustomError(400, "Turma ou Usuário não encontrados");

  try {
    const turmaCatequista = await repository.findOneByOrFail({
      usuario,
      turma,
    });
    return repository.delete(turmaCatequista);
  } catch (err: any) {
    throw new CustomError(400, "Erro na requisição", err);
  }
}
