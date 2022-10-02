import { Like } from "typeorm";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { CustomError } from "../../utils/customError";

const repository = db.getRepository(Catequizando);

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
