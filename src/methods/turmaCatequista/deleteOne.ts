import { isEmpty, isNull } from "lodash";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { Usuario } from "../../entities/usuario";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(TurmaCatequista);
const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);

export async function deleteOne(body: any) {
  const { usuarioId, turmaId } = body;

  if (!usuarioId || !turmaId)
    throw new CustomError(400, "Requisição incompleta");

  const usuario = await repUsuario.findOneBy({ id: usuarioId });
  const turma = await repTurma.findOneBy({ id: turmaId });

  if (isNull(usuario) || isNull(turma))
    throw new CustomError(400, "Turma ou Usuário não encontrados");

  try {
    const turmaCatequista = await repository.findOneByOrFail({
      usuario: {
        id: usuario.id,
      },
      turma: {
        id: turma.id,
      },
    });
    return repository.delete({ id: turmaCatequista.id });
  } catch (err: any) {
    throw new CustomError(400, "Erro na requisição", err);
  }
}
