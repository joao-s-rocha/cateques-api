import { IsEnum, IsOptional, IsString } from "class-validator";
import { isEmpty, isNull } from "lodash";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  UseBefore,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Usuario } from "../entities/usuario";
import methUsuario from "../methods/usuario";
import { validaLoginCoordenador } from "../utils/validaLogin";

enum TipoUsuario {
  COORDENADOR = "COORDENADOR",
  CATEQUISTA = "CATEQUISTA",
}

class GetByUsuario {
  @IsString({ message: "Este campo deve receber uma String" })
  @IsOptional()
  id_usuario!: string;

  @IsString({ message: "Este campo deve receber uma String" })
  @IsOptional()
  login!: string;

  @IsString({ message: "Este campo deve receber uma String" })
  @IsOptional()
  nome!: string;

  @IsEnum(TipoUsuario, { message: "Este campo deve receber um dia da semana" })
  @IsOptional()
  tipo!: string;

  @IsString({ message: "Este campo deve receber uma String" })
  @IsOptional()
  data_cad_inicial!: string;

  @IsString({ message: "Este campo deve receber uma String" })
  @IsOptional()
  data_cad_final!: string;
}

@JsonController("/usuario")
export class UsuarioController {
  @Get("/")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Retorna todos os usuários",
    responses: {
      "400": { description: "Erro na busca" },
    },
  })
  @ResponseSchema(Usuario, { isArray: true })
  getAll(@QueryParams() query: GetByUsuario) {
    if (isEmpty(query) || isNull(query)) {
      return methUsuario.getAll();
    }

    return methUsuario.getBy(query);
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
  @UseBefore(validaLoginCoordenador)
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
  @UseBefore(validaLoginCoordenador)
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
