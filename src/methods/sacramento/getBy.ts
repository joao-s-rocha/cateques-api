import { Like } from "typeorm";
import { db } from "../../db";
import { Sacramento } from "../../entities/sacramento";

const repository = db.getRepository(Sacramento);

export async function getBy(where: any) {
  //   const { qtdRepetidas, descricao, codigo, cnpjCpf } = where;
  //   if (cnpjCpf) {
  //     where = {
  //       cliente: { cnpjCpf },
  //       ...(descricao && { descricao: Like("%" + descricao + "%") }),
  //     };
  //   } else {
  //     where =
  //       (codigo && { codigo }) ||
  //       (descricao && { descricao: Like("%" + descricao + "%") }) ||
  //       (qtdRepetidas && { qtdRepetidas });
  //   }
  //   try {
  //     return await repository.find({
  //       relations: {
  //         catequizando: true,
  //       },
  //       where,
  //       order: {
  //         codigo: "ASC",
  //       },
  //     });
  //   } catch (err: any) {
  //     manageError("Erro na requisição", 400, err, cliRem);
  //   }
}
