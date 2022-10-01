import { isEmpty, isNull } from "lodash";
import { HttpCode, HttpError } from "routing-controllers";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { Usuario } from "../../entities/usuario";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { turmaPossuiCatequistas } from "./turmaPossuiCatequistas";

const repTurmaCatequista = db.getRepository(TurmaCatequista);
const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);

export async function addCatequistasToTurma(
  idsUsuarios: number[],
  idTurma: number
) {
  if (isEmpty(idsUsuarios)) throw new HttpError(400, "Usuarios não informados");

  if (await turmaPossuiCatequistas(idsUsuarios, idTurma))
    throw new HttpError(400, "Catequistas ou Turma informados inválidos");

  const turma = await repTurma.findOneBy({ id: idTurma });

  if (isEmpty(turma) || isNull(turma))
    throw new HttpError(400, "Turma não encontrada");

  idsUsuarios.forEach(async (id) => {
    const usuario = await repUsuario.findOneBy({ id });

    if (!isNull(usuario)) {
      try {
        repTurmaCatequista.save(repTurmaCatequista.create({ usuario, turma }));
      } catch (err: any) {
        throw new HttpError(400, "Erro ao ligar turma com catequizando");
      }
    }
  });

  return HttpCode(200);
}
