import { validateOrReject } from "class-validator";
import { CustomError } from "./customError";

export async function validate(obj: Object) {
  await validateOrReject(obj).catch((errors) => {
    const err = errors.reduce(
      (result: any, { value, property, constraints }: any) =>
        result.push({
          value: value,
          field: property,
          constraints: constraints,
        }) && result,
      []
    );
    throw new CustomError(500, "Erro na validação da classe", err);
  });
}
