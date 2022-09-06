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
import methCatequizando from "../methods/catequizando";
// import { validaLogin } from "../utils/validaLogin";

@JsonController("/catequizando")
export class CatequizandoController {
  @Get()
  getAll() {
    // if (isNull(param) || isEmpty(param)) {

    // }

    return methCatequizando.getAll();

    // return methSacramento.getBy(param);
  }

  @Get("/:id")
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
