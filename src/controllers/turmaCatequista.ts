import { BodyParam, Delete, JsonController, Post } from "routing-controllers";
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

  @Delete("/")
  @OpenAPI({
    summary: "Excluir relação entre turma e catequistas",
    description: "Informe a turma desejada e o usuário pelos seus Ids",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  delete(
    @BodyParam("turmaId", { required: true }) turmaId: number,
    @BodyParam("usuarioId", { required: true }) usuarioId: number
  ) {
    return methTurmaCatequista.deleteOne(turmaId, usuarioId);
  }
}
