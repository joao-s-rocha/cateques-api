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
import { Sacramento } from "../entities/sacramento";
import methSacramento from "../methods/sacramento";
import { validaLoginCoordenador } from "../utils/validaLogin";

@JsonController("/sacramento")
@UseBefore(validaLoginCoordenador)
export class SacramentoController {
  @Get("/")
  @OpenAPI({
    summary: "Retorna todos os Sacramentos",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Sacramento, { isArray: true })
  getAll() {
    return methSacramento.getAll();
  }

  @Get("/catequizando/:id")
  @OpenAPI({
    summary: "Busca Sacramentos de determinado Catequizando",
    description: "Informe o Id do Catequizando para receber seus Sacramentos",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Sacramento, { isArray: true })
  getOneCatequizando(@Param("id") id: number) {
    return methSacramento.getByCatequizando(id);
  }

  @Get("/:id")
  @OpenAPI({
    summary: "Retorna um Sacramento dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Sacramento)
  getOne(@Param("id") id: number) {
    return methSacramento.getOne(id);
  }

  @Post("/:id")
  @OpenAPI({
    summary: "Insere um Sacramento",
    description: "Informe o Id do Catequizando que receberá o Sacramento",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Sacramento)
  postOne(@Param("id") id: number, @Body({ validate: false }) sac: Sacramento) {
    return methSacramento.postOne(id, sac);
  }

  @Put("/:id")
  @OpenAPI({
    summary: "Atualiza um Sacramento",
    description:
      "Informe o Id do Sacramento, e no corpo da requisição apenas os campos que devem ser alterados. Lembrando que o campo tipo_sacramento não permite alteração.",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Sacramento)
  putOne(@Param("id") id: number, @Body({ validate: false }) sac: Sacramento) {
    return methSacramento.putOne(id, sac);
  }

  @Delete("/:id")
  @OpenAPI({
    summary: "Deleta um Sacramento dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methSacramento.deleteOne(id);
  }
}
