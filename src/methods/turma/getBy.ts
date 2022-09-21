import { isEmpty, isNull } from "lodash";
import { HttpError } from "routing-controllers";
import { Like } from "typeorm";
import { db } from "../../db";
import { Turma } from "../../entities/turma";

const repository = db.getRepository(Turma);

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

  // try {
  //   return await repository.find({
  //     where,
  //     order: {
  //       nome: "ASC",
  //     },
  //   });
  // } catch (err: any) {
  //   throw new HttpError(400, "Erro na busca");
  // }
}
