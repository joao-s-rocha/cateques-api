import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import methUsuario from "../methods/usuario";

@JsonController("/usuario")
export class UsuarioController {
  @Get("/")
  getAll() {
    return methUsuario.getAll();

    // TO-DO
    // if (!(isNull(param) || isEmpty(param)))
    // return methUsuario.getBy(param);
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return methUsuario.getOne(id);
  }

  @Post("/")
  postOne(@Body() usr: any) {
    return methUsuario.post(usr);
  }

  @Put("/:id")
  putOne(@Param("id") id: number, @Body() usr: any) {
    return methUsuario.putOne(id, usr);
  }

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {
    return methUsuario.deleteOne(id);
  }

  @Delete("/")
  deleteAll() {
    return methUsuario.deleteAll();
  }
}
