import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
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
  UseBefore,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Catequizando } from "../entities/catequizando";
import methCatequizando from "../methods/catequizando";
import { validaLoginCoordenador } from "../utils/validaLogin";

enum SimNao {
  SIM = "S",
  NAO = "N",
}

enum Sexo {
  MASCULINO = "M",
  FEMININO = "F",
}

enum EstadoCivil {
  CASADO = "C",
  SOLTEIRO = "S",
  VIUVO = "V",
  DIVORCIADO = "D",
}

enum TipoSacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

class GetByCatequizando {
  @IsInt()
  @IsOptional()
  id_catequizando!: Catequizando;

  @IsString({ message: "Este campo recebe uma string" })
  @IsOptional()
  nome!: string;

  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  todos_sac!: string;

  @IsEnum(EstadoCivil, { message: "Enum não correspondente" })
  @IsOptional()
  estado_civil!: string;

  @IsString({ message: "Este campo recebe uma string" })
  @IsOptional()
  telefone_1!: string;

  @IsString({ message: "Este campo recebe uma string" })
  @IsOptional()
  telefone_2!: string;

  @IsEnum(Sexo, { message: "Enum não correspondente" })
  @IsOptional()
  sexo!: string;

  @IsOptional()
  data_nascimento_inicial!: string;

  @IsOptional()
  data_nascimento_final!: string;

  @IsOptional()
  data_cad_inicial!: string;

  @IsOptional()
  data_cad_final!: string;
}

@JsonController("/catequizando")
export class CatequizandoController {
  @Get("/")
  @OpenAPI({
    summary: "Retorna todos os Catequizando",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando, { isArray: true })
  getAll(@QueryParams() query: GetByCatequizando) {
    if (isEmpty(query) || isNull(query)) {
      return methCatequizando.getAll();
    }

    return methCatequizando.getBy(query);
  }

  @Get("/:id")
  @OpenAPI({
    summary: "Retorna um Catequizando dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando)
  getOne(@Param("id") id: number) {
    return methCatequizando.getOne(id);
  }

  @Post("/")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Insere um Catequizando",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando)
  postOne(@Body({ validate: false }) cat: Catequizando) {
    return isArray(cat)
      ? methCatequizando.postOne(cat)
      : methCatequizando.postOne(cat);
  }

  @Put("/:id")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Atualiza um Catequizando",
    description:
      "Informe o Id do Catequizando, e no corpo da requisição apenas os campos que devem ser alterados",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  @ResponseSchema(Catequizando)
  putOne(
    @Param("id") id: number,
    @Body({ validate: false }) cat: Catequizando
  ) {
    return methCatequizando.putOne(id, cat);
  }

  @Delete("/:id")
  @UseBefore(validaLoginCoordenador)
  @OpenAPI({
    summary: "Deleta um Catequizando dado seu Id",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  deleteOne(@Param("id") id: number) {
    return methCatequizando.deleteOne(id);
  }
}
