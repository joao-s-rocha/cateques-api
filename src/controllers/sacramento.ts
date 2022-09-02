import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
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
} from "routing-controllers";
import methSacramento from "../methods/sacramento";

enum SimNao {
  SIM = "S",
  NAO = "N",
}

enum TipoSacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

class GetSacramento {
  @IsInt({ message: "Este campo recebe um inteiro" })
  @IsOptional()
  catequizando!: number;

  @IsString()
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  completo!: string;

  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(TipoSacramento, { message: "Enum não correspondente" })
  @IsOptional()
  tipo_sacramento!: string;
}

@JsonController("/sacramento")
export class SacramentoController {
  @Get()
  getAll(@QueryParams() param: GetSacramento) {
    if (isNull(param) || isEmpty(param)) {
      return methSacramento.getAll();
    }

    return methSacramento.getBy(param);
  }

  @Get("/:id")
  getByCatequizando(@Param("id") id: number) {
    return methSacramento.getOne(id);
  }

  @Post()
  postOne(@Body() cat: any) {
    return methSacramento.postOne(cat);
  }

  @Put()
  putOne(@Body() cat: any) {}

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {}
}
