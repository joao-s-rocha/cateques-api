import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Documentos } from "../entities/documentos";
import methDocumentos from "../methods/documentos";

@JsonController("/documentos")
export class DocumentosController {
  @Get("/")
  @OpenAPI({
    summary: "Retorna todos os Documentos",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Documentos, { isArray: true })
  getAll() {
    return methDocumentos.getAll();
  }

  @Get("/catequizando/:id")
  @OpenAPI({
    summary: "Busca Documentos de determinado Catequizando",
    description: "Informe o Id do Catequizando para receber seus Documentos",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Documentos)
  getOneCatequizando(@Param("id") id: number) {
    return methDocumentos.getByCatequizando(id);
  }

  @Get("/:id")
  @OpenAPI({
    summary: "Retorna um Documento dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Documentos)
  getOne(@Param("id") id: number) {
    return methDocumentos.getOne(id);
  }

  @Post("/:id")
  @OpenAPI({
    summary: "Insere um Documento",
    description: "Informe o Id do Catequizando que receberá o Documento",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Documentos)
  postOne(@Param("id") id: number, @Body({ validate: false }) doc: Documentos) {
    return methDocumentos.postOne(id, doc);
  }

  @Put("/:id")
  @OpenAPI({
    summary: "Atualiza um Documento",
    description:
      "Informe o Id do Documento, e no corpo da requisição apenas os campos que devem ser alterados",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Documentos)
  putOne(@Param("id") id: number, @Body({ validate: false }) doc: Documentos) {
    return methDocumentos.putOne(id, doc);
  }

  @Delete("/:id")
  @OpenAPI({
    summary: "Deleta um Documento dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methDocumentos.deleteOne(id);
  }
}
