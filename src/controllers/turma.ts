import { isEmpty, isNull } from "lodash";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
} from "routing-controllers";
import { Turma } from "../entities/turma";
import methTurma from "../methods/turma";
// import { validaLogin } from "../utils/validaLogin";

@JsonController("/turma")
export class TurmaController {
  @Get("/")
  getAll() {
    return methTurma.getAll();

    // TO-DO
    // if (isNull(param) || isEmpty(param))
    // return methTurma.getBy(param);
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return methTurma.getOne(id);
  }

  @Post("/")
  postOne(@Body() cat: any) {
    return methTurma.post(cat);
  }

  @Put("/:id")
  putOne(@Param("id") id: number, @Body() usr: any) {
    return methTurma.putOne(id, usr);
  }

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {
    return methTurma.deleteOne(id);
  }

  @Delete("/")
  deleteAll() {
    return methTurma.deleteAll();
  }
}
