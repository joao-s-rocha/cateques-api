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
    summary: "Ligação entre turma e catequistas que participarão dela",
    description:
      "Informe a turma desejada e o vetor de Ids dos usuários que serão os Catequistas que ministrarão tal turma",
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

  // @Delete("/")
  // delete(
  //   @BodyParam("turmaId", { required: true }) turmaId: number,
  //   @BodyParam("usuariosId", { required: true }) usuariosId: number[]
  // ) {}
}
