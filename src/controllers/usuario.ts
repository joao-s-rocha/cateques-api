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
import methUsuario from "../methods/usuario";

@JsonController("/usuario")
export class UsuarioController {
  @Get("/")
  getAll(@QueryParams() param: any) {
    if (isNull(param) || isEmpty(param)) {
      return methUsuario.getAll();
    }

    return methUsuario.getBy(param);
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return methUsuario.getOne(id);
  }

  @Post("/")
  postOne(@Body() cat: any) {
    return methUsuario.post(cat);
  }

  @Put("/")
  putOne(@Body() cat: any) {}

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {}
}
