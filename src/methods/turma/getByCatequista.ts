import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { isEmpty, isNull } from "lodash";
import { Usuario } from "../../entities/usuario";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { CustomError } from "../../utils/customError";
import { HttpCode } from "routing-controllers";

const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);

export async function getByCatequista(id: number) {
  const usuario = await repUsuario.findOneBy({ id });
  let where: {};

  if (isEmpty(usuario) || isNull(usuario))
    throw new CustomError(400, "Usuario não encontrado");

  if (usuario.tipo == "COORDENADOR") return repTurma.find();
  else {
    const usuariosTurma = await db
      .getRepository(TurmaCatequista)
      .createQueryBuilder("tc")
      .select("tc.turmaId")
      .where("tc.usuarioId = :usuario", {
        usuario: id,
      })
      .getMany();

    if (isEmpty(usuariosTurma)) return HttpCode(200);

    const turmas = await db
      .getRepository(Turma)
      .createQueryBuilder("t")
      .where("t.id in (:turmas)", {
        turmas: usuariosTurma.toString(),
      })
      .getMany();

    return turmas;
  }
}
