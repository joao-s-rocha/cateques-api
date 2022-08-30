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
import methSacramento from "../methods/sacramento";
import { validaLogin } from "../utils/util";

@JsonController("/sacramento")
export class SacramentoController {
  @Get("/by")
  getManyBy() {}

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
