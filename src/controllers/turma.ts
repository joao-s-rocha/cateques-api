import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UseBefore,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Turma } from "../entities/turma";
import methTurma from "../methods/turma";
import { validaLoginCoordenador } from "../utils/validaLogin";

@JsonController("/turma")
export class TurmaController {
  @Get("/usuario/:id")
  @OpenAPI({
    summary: "Retorna um vetor de turmas dado um Usuário",
    description:
      "Passe o Id do Usuário desejado, e será retornado apenas turmas que pertencem a tal Usuário. Caso o usuário seja um Coordenador, serão retornadas todas as turmas",
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

  @Get("/catequizando/:id")
  @OpenAPI({
    summary: "Retorna um vetor de turmas dado um Catequizando",
    description:
      "Passe o Id do Catequizando desejado, e será retornado apenas turmas que pertencem a tal Catequizando",
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
  getByCatequizando(@Param("id") id: number) {
    return methTurma.getByCatequizando(id);
  }

  @Get("/")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Retorna todas as turmas",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Turma, { isArray: true })
  getAll() {
    return methTurma.getAll();
  }

  @Get("/:id")
  @OpenAPI({
    summary: "Retorna uma turma dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Turma)
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
  @ResponseSchema(Turma)
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
  @ResponseSchema(Turma)
  putOne(@Param("id") id: number, @Body({ validate: false }) tur: Turma) {
    return methTurma.putOne(id, tur);
  }

  @Delete("/:id")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Deleta uma turma dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methTurma.deleteOne(id);
  }
}
