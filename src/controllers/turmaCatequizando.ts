import {
  BodyParam,
  Delete,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import methTurmaCatequizando from "../methods/turmaCatequizando";

@JsonController("/turmaCatequizando")
export class TurmaCatequistaController {
  @Post("/")
  @OpenAPI({
    summary: "Ligação entre turma e catequizandos que participarão dela",
    description:
      "Informe a turma desejada e o vetor de Ids dos catequizandos que participarão dessa turma",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  postTurmaCatequista(
    @BodyParam("turmaId", { required: true }) turmaId: number,
    @BodyParam("usuariosId", { required: true }) usuariosId: number[]
  ) {
    return methTurmaCatequizando.addCatequizandosToTurma(usuariosId, turmaId);
  }

  @Delete("/")
  delete(
    @BodyParam("turmaId", { required: true }) turmaId: number,
    @BodyParam("usuarioId", { required: true }) usuarioId: number
  ) {
    return methTurmaCatequizando.deleteOne(turmaId, usuarioId);
  }
}
