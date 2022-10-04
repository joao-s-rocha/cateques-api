import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Usuario } from "../entities/usuario";
import methUsuario from "../methods/usuario";

@JsonController("/usuario")
export class UsuarioController {
  @Get("/")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na busca" },
    },
  })
  getAll() {
    return methUsuario.getAll();

    // TO-DO
    // if (!(isNull(param) || isEmpty(param)))
    // return methUsuario.getBy(param);
  }

  @Get("/:id")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na busca" },
    },
  })
  getOne(@Param("id") id: number) {
    return methUsuario.getOne(id);
  }

  @Post("/login")
  @OpenAPI({
    responses: {
      "400": { description: "Registro inválido" },
    },
  })
  login(@Body() params: any) {
    return methUsuario.login(params);
  }

  @Post("/")
  @OpenAPI({
    responses: {
      "400": { description: "Registro inválido" },
    },
  })
  postOne(@Body({ validate: false }) usr: Usuario) {
    return methUsuario.post(usr);
  }

  @Put("/:id")
  @OpenAPI({
    responses: {
      "404": { description: "Usuário não encontrado" },
      "400": { description: "Falha na requisição de modificação" },
    },
  })
  putOne(@Param("id") id: number, @Body({ validate: false }) usr: Usuario) {
    return methUsuario.putOne(id, usr);
  }

  @Delete("/:id")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methUsuario.deleteOne(id);
  }

  @Delete("/")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteAll() {
    return methUsuario.deleteAll();
  }
}
