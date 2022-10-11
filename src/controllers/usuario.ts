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
import { Usuario } from "../entities/usuario";
import methUsuario from "../methods/usuario";
import { validaLoginCoordenador } from "../utils/validaLogin";

@JsonController("/usuario")
@UseBefore(validaLoginCoordenador)
export class UsuarioController {
  @Get("/")
  @OpenAPI({
    summary: "Retorna todos os usuários",
    responses: {
      "400": { description: "Erro na busca" },
    },
  })
  @ResponseSchema(Usuario, { isArray: true })
  getAll() {
    return methUsuario.getAll();
  }

  @Get("/:id")
  @OpenAPI({
    summary: "Retorna um usuário dado seu Id",
    responses: {
      "400": { description: "Erro na busca" },
    },
  })
  @ResponseSchema(Usuario)
  getOne(@Param("id") id: number) {
    return methUsuario.getOne(id);
  }

  @Post("/")
  @OpenAPI({
    summary: "Insere um usuário",
    responses: {
      "400": { description: "Registro inválido" },
    },
  })
  @ResponseSchema(Usuario)
  postOne(@Body({ validate: false }) usr: Usuario) {
    return methUsuario.post(usr);
  }

  @Put("/:id")
  @OpenAPI({
    summary: "Altera um usuário dado seu Id",
    description:
      "Informe o Id do usuário, e no corpo da requisição apenas os campos que devem ser alterados",
    responses: {
      "404": { description: "Usuário não encontrado" },
      "400": { description: "Falha na requisição de modificação" },
    },
  })
  @ResponseSchema(Usuario)
  putOne(@Param("id") id: number, @Body({ validate: false }) usr: Usuario) {
    return methUsuario.putOne(id, usr);
  }

  @Delete("/:id")
  @OpenAPI({
    summary: "Deleta um usuário dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methUsuario.deleteOne(id);
  }
}
