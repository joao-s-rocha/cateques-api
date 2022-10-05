import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { isEmpty, isNull, pick } from "lodash";
import { Usuario } from "../../entities/usuario";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { CustomError } from "../../utils/customError";
const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);
const repTurmaCatequista = db.getRepository(TurmaCatequista);

export async function getByCatequista(id: number) {
  const usuario = await repUsuario.findOneBy({ id });

  if (isEmpty(usuario) || isNull(usuario))
    throw new CustomError(400, "Usuario não encontrado");

  if (usuario.tipo == "COORDENADOR") return repTurma.find();
  else {
    const turmas = await repTurmaCatequista.find({
      select: {
        data_cad: false,
        id: false,
      },
      relations: {
        turma: true,
      },
      where: {
        usuario: {
          id,
        },
      },
    });

    const finalTurmas: Turma[] = [];

    for (const value of turmas) {
      const { turma } = value;
      finalTurmas.push(turma);
    }
    return finalTurmas;
  }
}
