import {
  BodyParam,
  Delete,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import methTurmaCatequista from "../methods/turmaCatequista";

@JsonController("/turmaCatequista")
export class TurmaCatequistaController {
  @Post("/")
  @OpenAPI({
    description:
      "Nesta rota, fazemos a ligação entre turma e catequistas que participarão dela",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  postTurmaCatequista(
    @BodyParam("turmaId", { required: true }) turmaId: number,
    @BodyParam("usuariosId", { required: true }) usuariosId: number[]
  ) {
    return methTurmaCatequista.addCatequistasToTurma(usuariosId, turmaId);
  }

  @Delete("/")
  delete(
    @BodyParam("turmaId", { required: true }) turmaId: number,
    @BodyParam("usuariosId", { required: true }) usuariosId: number[]
  ) {}
}
