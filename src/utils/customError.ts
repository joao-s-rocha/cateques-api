import { HttpError } from "routing-controllers";

export class CustomError extends HttpError {
  private operation!: string;
  private errors: any[];

  constructor(errorCode: number = 400, message: string, errors: any = []) {
    super(errorCode, message);
    Object.setPrototypeOf(this, CustomError);
    this.errors = errors;
  }
}
