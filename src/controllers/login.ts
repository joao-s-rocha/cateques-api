import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import methUsuario from "../methods/usuario";

@JsonController("/login")
export class Login {
  @Post("/")
  @OpenAPI({
    summary: "Faz login com um usuário",
    description: "Usuário padrão: login = admin e senha = catequese",
    responses: {
      "200": {
        description: "Sucesso",
        content: {
          "application/json": {
            example: {
              id_usuario: 1,
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
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
}
