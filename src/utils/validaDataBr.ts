import { isExists, isValid } from "date-fns";
import { isDate, isEmpty, isNull } from "lodash";

export function validaDataBr(data: String): Boolean {
  const dataSeparada = data.split("/");

  if (isEmpty(dataSeparada) || isNull(dataSeparada) || dataSeparada.length != 3)
    return false;

  const dia = dataSeparada[0];
  const mes = dataSeparada[1];
  const ano = dataSeparada[2];

  return isExists(+ano, +mes - 1, +dia);
}
