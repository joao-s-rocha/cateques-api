import { isEmpty, isNull } from "lodash";
import {
  Body,
  BodyParam,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Turma } from "../entities/turma";
import methTurma from "../methods/turma";

@JsonController("/turma")
export class TurmaController {
  // @Get("/catequista/:id")
  // @OpenAPI({
  //   responses: {
  //     "400": { description: "Erro na requisição" },
  //   },
  // })
  // getByCatequista(@Param("id") id: number) {
  //   return methTurma.getByCatequista(id);
  // }

  @Get("/")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  getAll() {
    return methTurma.getAll();

    // TO-DO
    // if (isNull(param) || isEmpty(param))
    // return methTurma.getBy(param);
  }

  // @Get("/teste")
  // compareCatequi() {
  //   return methTurmaCatequista.compareCatequistas([1, 34, 20], 1);
  // }

  @Get("/:id")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  getOne(@Param("id") id: number) {
    return methTurma.getOne(id);
  }

  @Post("/")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  postOne(@Body({ validate: false }) tur: Turma) {
    return methTurma.post(tur);
  }

  @Put("/:id")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  putOne(@Param("id") id: number, @Body({ validate: false }) tur: Turma) {
    return methTurma.putOne(id, tur);
  }

  @Delete("/:id")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methTurma.deleteOne(id);
  }

  @Delete("/")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteAll() {
    return methTurma.deleteAll();
  }
}
