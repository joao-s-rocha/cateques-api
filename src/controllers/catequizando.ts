import { isArray, isEmpty, isNull } from "lodash";
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
import { Catequizando } from "../entities/catequizando";
import { Documentos } from "../entities/documentos";
import methCatequizando from "../methods/catequizando";

@JsonController("/catequizando")
export class CatequizandoController {
  @Get("/")
  getAll(@QueryParams({ validate: false }) param: Catequizando) {
    if (isNull(param) || isEmpty(param)) {
      return methCatequizando.getAll();
    }

    return methCatequizando.getBy(param);
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return methCatequizando.getOne(id);
  }

  @Post("/")
  postOne(@Body({ validate: false }) cat: Catequizando) {
    return isArray(cat)
      ? methCatequizando.postOne(cat)
      : methCatequizando.postOne(cat);
  }

  @Put("/:id")
  @OpenAPI({
    summary: "Atualiza um Catequizando",
    description:
      "Informe o Id do Catequizando, e no corpo da requisição apenas os campos que devem ser alterados",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  putOne(
    @Param("id") id: number,
    @Body({ validate: false }) cat: Catequizando
  ) {
    return methCatequizando.putOne(id, cat);
  }

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {}
}
