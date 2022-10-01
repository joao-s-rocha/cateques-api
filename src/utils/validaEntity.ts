import { validateOrReject } from "class-validator";
import { CustomError } from "./customError";

export async function validate(obj: Object) {
  await validateOrReject(obj).catch((errors) => {
    const err = errors.reduce(
      (result: any, { value, constraints }: any) =>
        result.push({ value: value, errors: constraints }) && result,
      []
    );
    throw new CustomError(400, "Erro na validação da classe", err);
  });
}
