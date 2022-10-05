import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { isEmpty, isNull, pick } from "lodash";
import { Usuario } from "../../entities/usuario";
import { TurmaCatequista } from "../../entities/turmaCatequista";
import { CustomError } from "../../utils/customError";
import { HttpCode } from "routing-controllers";

const repUsuario = db.getRepository(Usuario);
const repTurma = db.getRepository(Turma);
const repTurmaCatequista = db.getRepository(TurmaCatequista);

export async function getByCatequista(id: number) {
  const usuario = await repUsuario.findOneBy({ id });

  if (isEmpty(usuario) || isNull(usuario))
    throw new CustomError(400, "Usuario não encontrado");

  // console.log(await repTurmaCatequista.findOneBy());

  if (usuario.tipo == "COORDENADOR") return repTurma.find();
  else {
    const usuariosTurma = await repTurmaCatequista.find({
      relations: {
        turma: true,
      },
      where: {
        usuario: {
          id,
        },
      },
    });

    // for (const value of usuariosTurma) {
    //   let retorno = {retorno, ...pick(value, "turma")} : {};
    // }
    // console.log(pick(usuariosTurma, "TurmaCatequista.turma"));
    // const vet = usuariosTurma.forEach((tc, i) => {
    //   return tc.id;
    // });

    // const oi = usuariosTurma.values();

    if (isEmpty(usuariosTurma)) return HttpCode(200);

    const turmas = await db
      .getRepository(Turma)
      .createQueryBuilder("turma")
      .where("t.id in (:turmas)", {
        turmas: usuariosTurma.toString(),
      })
      .getMany();

    return turmas;
  }
}
