import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import methCatequizando from "../methods/catequizando";

@JsonController("/catequizando")
export class CatequizandoController {
  @Get("/by")
  getManyBy() {}

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return methCatequizando.getOne(id);
  }

  @Post()
  postOne(@Body() cat: any) {}

  @Put()
  putOne(@Body() cat: any) {}

  @Delete("/:id")
  deleteOne(@Param("id") id: number) {}
}
