import { isArray } from "lodash";
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
import { Catequizando } from "../entities/catequizando";
import methCatequizando from "../methods/catequizando";
import { validaLoginCoordenador } from "../utils/validaLogin";

@JsonController("/catequizando")
export class CatequizandoController {
  @Get("/")
  @OpenAPI({
    summary: "Retorna todos os Catequizando",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando, { isArray: true })
  getAll() {
    return methCatequizando.getAll();
  }

  @Get("/:id")
  @OpenAPI({
    summary: "Retorna um Catequizando dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando)
  getOne(@Param("id") id: number) {
    return methCatequizando.getOne(id);
  }

  @Post("/")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Insere um Catequizando",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando)
  postOne(@Body({ validate: false }) cat: Catequizando) {
    return isArray(cat)
      ? methCatequizando.postOne(cat)
      : methCatequizando.postOne(cat);
  }

  @Put("/:id")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Atualiza um Catequizando",
    description:
      "Informe o Id do Catequizando, e no corpo da requisição apenas os campos que devem ser alterados",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando)
  putOne(
    @Param("id") id: number,
    @Body({ validate: false }) cat: Catequizando
  ) {
    return methCatequizando.putOne(id, cat);
  }

  @Delete("/:id")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Deleta um Catequizando dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methCatequizando.deleteOne(id);
  }
}
