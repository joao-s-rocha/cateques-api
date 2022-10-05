import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  UseBefore,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Sacramento } from "../entities/sacramento";
import methSacramento from "../methods/sacramento";

@JsonController("/sacramento")
export class SacramentoController {
  @Get("/")
  @OpenAPI({
    summary: "Retorna todos os Sacramentos",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
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
  postOne(@Param("id") id: number, @Body({ validate: false }) sac: Sacramento) {
    return methSacramento.postOne(id, sac);
  }

  // @Put("/:id")
  // @OpenAPI({
  //   summary: "Atualiza um Sacramento",
  //   description:
  //     "Informe o Id do Sacramento, e no corpo da requisição apenas os campos que devem ser alterados",
  //   responses: {
  //     "400": { description: "Erro na requisição" },
  //   },
  // })
  // putOne(@Param("id") id: number, @Body({ validate: false }) sac: Sacramento) {
  //   return methSacramento.putOne(id, sac);
  // }

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
