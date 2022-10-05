export function dataBrToDate(data: string): Date {
  const dataSeparada = data.split("/");

  const dia = dataSeparada[0];
  const mes = dataSeparada[1];
  const ano = dataSeparada[2];

  const dataJunta = mes + "/" + dia + "/" + ano;

  return new Date(dataJunta);
}
