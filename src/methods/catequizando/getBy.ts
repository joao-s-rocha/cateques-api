import { Between, Like } from "typeorm";
import { db } from "../../db";
import { Catequizando } from "../../entities/catequizando";
import { CustomError } from "../../utils/customError";
import { dataBrToDate } from "../../utils/dataBrToDate";
import { validarCompletoDataBr } from "../../utils/validarCompletoDatabBr";
import methDocumentos from "../documentos";
import methSacramentos from "../sacramento";

const repository = db.getRepository(Catequizando);

export async function getBy(where: any) {
  let {
    id_catequizando,
    nome,
    todos_sac,
    estado_civil,
    telefone_1,
    telefone_2,
    sexo,
    data_nascimento_inicial,
    data_nascimento_final,
    data_cad_inicial,
    data_cad_final,
    cpf,
    rg,
    comprovante_residencia,
    admissao,
    vive_maritalmente,
    casamento_civil,
    casamento_igreja,
    tipo_sacramento,
    nome_padrinho,
    nome_madrinha,
    data_inicio_sacramento,
    data_fechamento_sacramento,
  } = where;

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

  if (
    data_nascimento_inicial &&
    validarCompletoDataBr(data_nascimento_inicial.toString())
  ) {
    data_nascimento_inicial = dataBrToDate(data_nascimento_inicial);
    data_nascimento_inicial = new Date(
      (data_nascimento_inicial as Date).setUTCHours(0, 0, 0, 0)
    );
  }

  if (
    data_nascimento_final &&
    validarCompletoDataBr(data_nascimento_final.toString())
  ) {
    data_nascimento_final = dataBrToDate(data_nascimento_final);
    data_nascimento_final = new Date(
      (data_nascimento_final as Date).setUTCHours(23, 59, 59, 0)
    );
  }

  const data_nascimento =
    data_nascimento_inicial && data_nascimento_final
      ? {
          data_nascimento: Between(
            data_nascimento_inicial,
            data_nascimento_final
          ),
        }
      : data_nascimento_inicial
      ? { data_nascimento: data_nascimento_inicial }
      : null;

  where = {
    ...(id_catequizando && { id: id_catequizando }),
    ...(nome && { nome: Like("%" + nome + "%") }),
    ...(todos_sac && { todos_sac }),
    ...(estado_civil && { estado_civil }),
    ...(telefone_1 && { telefone_1: Like("%" + telefone_1 + "%") }),
    ...(telefone_2 && { telefone_2: Like("%" + telefone_2 + "%") }),
    ...(sexo && { sexo }),
    ...(data_nascimento && data_nascimento),
    ...(data_cad && data_cad),
    // ...(cpf && { cpf }),
    // ...(rg && { rg }),
    // ...(comprovante_residencia && { comprovante_residencia }),
    // ...(admissao && { admissao }),
    // ...(vive_maritalmente && { vive_maritalmente }),
    // ...(casamento_civil && { casamento_civil }),
    // ...(casamento_igreja && { casamento_igreja }),
    // ...(casamento_igreja && { casamento_igreja }),
    // ...(tipo_sacramento && { tipo_sacramento }),
    // ...(nome_padrinho && { nome_padrinho: Like("%" + nome_padrinho + "%") }),
    // ...(nome_madrinha && { nome_madrinha: Like("%" + nome_madrinha + "%") }),
    // ...(data_inicio && data_inicio),
  };

  try {
    const catequizandos = (await repository.find({
      where,
      order: {
        nome: "ASC",
      },
    })) as any;

    let count = 0;

    for (const thisCatequizando of catequizandos) {
      catequizandos[count].documentos = await methDocumentos.getByCatequizando(
        thisCatequizando.id
      );
      catequizandos[count].sacramentos =
        await methSacramentos.getByCatequizando(thisCatequizando.id);

      count++;
    }

    return catequizandos;
  } catch (err: any) {
    throw new CustomError(400, "Erro na busca", err);
  }
}
