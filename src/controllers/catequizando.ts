import { isArray, isEmpty, isNull } from "lodash";
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
import { Catequizando } from "../entities/catequizando";
import methCatequizando from "../methods/catequizando";

@JsonController("/catequizando")
export class CatequizandoController {
  @Get("/")
  getAll(@QueryParams() param: Catequizando) {
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
  postOne(@Body({ validate: false }) cat: any) {
    return isArray(cat)
      ? methCatequizando.postOne(cat)
      : methCatequizando.postOne(cat);
  }

  @Put("/")
  putOne(@Body() cat: any) {}

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {}
}
