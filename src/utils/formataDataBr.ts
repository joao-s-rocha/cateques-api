import { format } from "date-fns";

export function formataDataBr(data: Date): String {
  return format(data, "dd/MM/yyyy");
}
