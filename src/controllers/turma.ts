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
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Turma } from "../entities/turma";
import methTurma from "../methods/turma";

@JsonController("/turma")
export class TurmaController {
  @Get("/usuario/:id")
  @OpenAPI({
    summary: "Retorna um vetor de turmas dado um usuário",
    description:
      "Passe o Id do Usuário desejado, e será retornado apenas turmas que pertencem a tal Catequista. Caso o usuário seja um Coordenador, serão retornadas todas as turmas",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Turma, {
    isArray: true,
    contentType: "application/json",
    description: "Uma lista de turmas",
    statusCode: "200",
  })
  getByCatequista(@Param("id") id: number) {
    return methTurma.getByCatequista(id);
  }

  @Get("/")
  @OpenAPI({
    summary: "Retorna todas as turmas",
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

  @Get("/:id")
  @OpenAPI({
    summary: "Retorna uma turma dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  getOne(@Param("id") id: number) {
    return methTurma.getOne(id);
  }

  @Post("/")
  @OpenAPI({
    summary: "Insere uma turma",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  postOne(@Body({ validate: false }) tur: Turma) {
    return methTurma.post(tur);
  }

  @Put("/:id")
  @OpenAPI({
    summary: "Atualiza uma turma",
    description:
      "Informe o Id da turma, e no corpo da requisição apenas os campos que devem ser alterados",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  putOne(@Param("id") id: number, @Body({ validate: false }) tur: Turma) {
    return methTurma.putOne(id, tur);
  }

  @Delete("/:id")
  @OpenAPI({
    summary: "Deleta uma turma dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methTurma.deleteOne(id);
  }

  @Delete("/")
  @OpenAPI({
    summary: "Deleta todas turmas",
    description: "Utilizar essa rota com cautela",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteAll() {
    return methTurma.deleteAll();
  }
}
