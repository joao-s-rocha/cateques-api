import { BodyParam, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import methTurmaCatequista from "../methods/turmaCatequista";

@JsonController("/turmaCatequista")
export class TurmaCatequistaController {
  @Post("/")
  @OpenAPI({
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  postTurmaCatequista(
    @BodyParam("turmaId", { required: true, validate: true }) turmaId: number,
    @BodyParam("usuariosId", { required: true }) usuariosId: number[]
  ) {
    return methTurmaCatequista.addCatequistasToTurma(usuariosId, turmaId);
  }
}
