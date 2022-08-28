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
import methCatequizando from "../methods/catequizando";
import { validaLogin } from "../utils/util";

@JsonController("/catequizando")
export class CatequizandoController {
  @Get("/by")
  getManyBy() {}

  @Get("/:id")
  //   @UseBefore(validaLogin)
  getOne(@Param("id") id: number) {
    return methCatequizando.getOne(id);
  }

  @Post()
  postOne(@Body() cat: any) {
    return methCatequizando.postOne(cat);
  }

  @Put()
  putOne(@Body() cat: any) {}

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {}
}
