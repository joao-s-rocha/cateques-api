export function dataBrToDate(data: String): Date {
  const dataSeparada = data.split("/");

  const dia = parseInt(dataSeparada[0]);
  const mes = parseInt(dataSeparada[1]);
  const ano = parseInt(dataSeparada[2]);

  return new Date(ano, mes, dia, 0, 0, 0, 0);
}
