import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { Between, Like } from "typeorm";
import { db } from "../../db";
import { Turma } from "../../entities/turma";
import { validarCompletoDataBr } from "../../utils/validarCompletoDatabBr";
import { dataBrToDate } from "../../utils/dataBrToDate";
import { getOneCompleto } from "./getOneCompleto";

const repository = db.getRepository(Turma);

export async function getBy(where: any) {
  let turmasCompletas: any = [];

  let {
    descricao,
    dia_semana,
    hora_inicial,
    hora_final,
    status,
    data_conclusao_inicial,
    data_conclusao_final,
    data_cad_inicial,
    data_cad_final,
  } = where;

  const hora =
    hora_inicial && hora_final
      ? { hora: Between(hora_inicial, hora_final) }
      : hora_inicial
      ? { hora: hora_inicial }
      : null;

  if (
    data_conclusao_inicial &&
    validarCompletoDataBr(data_conclusao_inicial.toString())
  ) {
    data_conclusao_inicial = dataBrToDate(data_conclusao_inicial);
    data_conclusao_inicial = new Date(
      (data_conclusao_inicial as Date).setUTCHours(0, 0, 0, 0)
    );
  }

  if (
    data_conclusao_final &&
    validarCompletoDataBr(data_conclusao_final.toString())
  ) {
    data_conclusao_final = dataBrToDate(data_conclusao_final);
    data_conclusao_final = new Date(
      (data_conclusao_final as Date).setUTCHours(23, 59, 59, 0)
    );
  }

  if (data_cad_inicial && validarCompletoDataBr(data_cad_inicial.toString())) {
    data_cad_inicial = dataBrToDate(data_cad_inicial);
    data_cad_inicial = new Date(
      (data_cad_inicial as Date).setUTCHours(0, 0, 0, 0)
    );
  }

  if (data_cad_final && validarCompletoDataBr(data_cad_final.toString())) {
    data_cad_final = dataBrToDate(data_cad_final);
    data_cad_final = new Date(
      (data_cad_final as Date).setUTCHours(23, 59, 59, 0)
    );
  }

  const data_conclusao =
    data_conclusao_inicial && data_conclusao_final
      ? {
          data_conclusao: Between(data_conclusao_inicial, data_conclusao_final),
        }
      : data_conclusao_inicial
      ? { data_conclusao: data_conclusao_inicial }
      : null;

  const data_cad =
    data_cad_inicial && data_cad_final
      ? { data_cad: Between(data_cad_inicial, data_cad_final) }
      : data_cad_inicial
      ? { data_cad: data_cad_inicial }
      : null;

  where = {
    ...(descricao && { descricao: Like("%" + descricao + "%") }),
    ...(dia_semana && { dia_semana: Like("%" + dia_semana + "%") }),
    ...(hora && hora),
    ...(status && { status }),
    ...(data_conclusao && data_conclusao),
    ...(data_cad && data_cad),
  };

  try {
    const turmas = await repository.find({
      where,
      order: {
        dia_semana: "ASC",
      },
    });

    if (isEmpty(turmas)) return [];

    for (const thisTurma of turmas) {
      turmasCompletas.push(await getOneCompleto(thisTurma.id));
    }

    return turmasCompletas;
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
