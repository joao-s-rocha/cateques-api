import { CustomError } from "../../utils/customError";
import { Between, Like } from "typeorm";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";
import { validarCompletoDataBr } from "../../utils/validarCompletoDatabBr";
import { dataBrToDate } from "../../utils/dataBrToDate";

const repository = db.getRepository(Usuario);

export async function getBy(where: any) {
  let { id_usuario, nome, login, tipo, data_cad_inicial, data_cad_final } =
    where;

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

  const data_cad =
    data_cad_inicial && data_cad_final
      ? { data_cad: Between(data_cad_inicial, data_cad_final) }
      : data_cad_inicial
      ? { data_cad: data_cad_inicial }
      : null;

  where = {
    ...(id_usuario && { id: id_usuario }),
    ...(nome && { nome: Like("%" + nome + "%") }),
    ...(login && { login: Like("%" + login + "%") }),
    ...(tipo && { tipo: Like("%" + tipo + "%") }),
    ...(data_cad && data_cad),
  };

  try {
    return await repository.find({
      where,
      order: {
        nome: "ASC",
      },
    });
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
