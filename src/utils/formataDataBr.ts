import { format, parse, parseISO } from "date-fns";

export function formataDataBr(data: Date | string): String {
  try {
    return format(parseISO(data as string), "dd/MM/yyyy");
  } catch {
    return format(data as Date, "dd/MM/yyyy");
  }
}
