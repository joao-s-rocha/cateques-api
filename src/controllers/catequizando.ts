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
  postOne(
    @BodyParam("catequizando", { validate: false }) cat: Catequizando,
    @BodyParam("documentos", { validate: false }) docs: Documentos
  ) {
    return isArray(cat)
      ? methCatequizando.postOne(cat, docs)
      : methCatequizando.postOne(cat, docs);
  }

  // @Put("/")
  // putOne(@Body() cat: any) {}

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {}
}
