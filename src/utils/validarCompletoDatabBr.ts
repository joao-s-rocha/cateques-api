import { CustomError } from "./customError";
import { dataBrToDate } from "./dataBrToDate";
import { validaDataBr } from "./validaDataBr";

export function validarCompletoDataBr(data: string): Boolean {
  const hoje = new Date(Date.now());

  if (!validaDataBr(data))
    throw new CustomError(500, "Data inválida", {
      value: data,
    });
  const dataFormatada = dataBrToDate(data as any);

  if (dataFormatada > hoje)
    throw new CustomError(
      500,
      "Não é permitido inserção de data futura para este campo",
      {
        value: dataFormatada,
      }
    );

  return true;
}
