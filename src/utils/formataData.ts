import { format } from "date-fns";

export function formataData(data: Date): String {
  return format(data, "dd/MM/yyyy");
}
