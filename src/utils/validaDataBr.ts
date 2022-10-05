import { isExists } from "date-fns";
import { isEmpty, isNull } from "lodash";

export function validaDataBr(data: string): Boolean {
  const dataSeparada = data.split("/");

  if (isEmpty(dataSeparada) || isNull(dataSeparada) || dataSeparada.length != 3)
    return false;

  const dia = dataSeparada[0];
  const mes = dataSeparada[1];
  const ano = dataSeparada[2];

  try {
    const teste = new Date(ano + "-" + mes + "-" + dia);
  } catch {
    return false;
  }

  return isExists(+ano, +mes - 1, +dia);
}
