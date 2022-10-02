import { isEmpty, isNull } from "lodash";
import { CustomError } from "../../utils/customError";
import { Like } from "typeorm";
import { db } from "../../db";
import { Usuario } from "../../entities/usuario";

const repository = db.getRepository(Usuario);

export async function getBy(where: any) {
  const {
    nome,
    todos_sac,
    padrinho,
    madrinha,
    estado_civil,
    data_nascimento,
    data_cad,
  } = where;

  where = {
    ...(nome && { nome: Like("%" + nome + "%") }),
    ...(padrinho && { padrinho }),
    ...(madrinha && { madrinha }),
    ...(estado_civil && { estado_civil }),
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
