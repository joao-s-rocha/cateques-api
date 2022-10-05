import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Usuario } from "../entities/usuario";
import methUsuario from "../methods/usuario";

@JsonController("/usuario")
export class UsuarioController {
  @Get("/")
  @OpenAPI({
    summary: "Retorna todos os usuários",
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
    summary: "Retorna um usuário dado seu Id",
    responses: {
      "400": { description: "Erro na busca" },
    },
  })
  getOne(@Param("id") id: number) {
    return methUsuario.getOne(id);
  }

  @Post("/login")
  @OpenAPI({
    summary: "Faz login com um usuário",
    responses: {
      "200": {
        description: "Sucesso",
        content: {
          "application/json": {
            example: {
              tokenCatequese: {
                tipo: "XXXXX",
                id: 1,
              },
            },
          },
        },
      },
      "400": { description: "Registro inválido" },
    },
    requestBody: {
      content: {
        "application/json": {
          example: {
            login: "login",
            senha: "senhasecreta",
          },
        },
      },
    },
  })
  login(@Body() params: any) {
    return methUsuario.login(params);
  }

  @Post("/")
  @OpenAPI({
    summary: "Insere um usuário",
    responses: {
      "400": { description: "Registro inválido" },
    },
  })
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

  @Delete("/")
  @OpenAPI({
    summary: "Deleta todas turmas",
    description: "Utilizar essa rota com cautela",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteAll() {
    return methUsuario.deleteAll();
  }
}
