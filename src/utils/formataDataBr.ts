export function formataDataBr(data: Date): string {
  return (
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()
  );
}
