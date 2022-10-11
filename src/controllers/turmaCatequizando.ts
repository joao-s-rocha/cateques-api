import {
  BodyParam,
  Delete,
  JsonController,
  Post,
  UseBefore,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import methTurmaCatequizando from "../methods/turmaCatequizando";
import { validaLoginCoordenador } from "../utils/validaLogin";

@JsonController("/turmaCatequizando")
@UseBefore(validaLoginCoordenador)
export class TurmaCatequizandoController {
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
    @BodyParam("catequizandosId", { required: true }) catequizandosId: number[]
  ) {
    return methTurmaCatequizando.addCatequizandosToTurma(
      catequizandosId,
      turmaId
    );
  }

  @Delete("/")
  @OpenAPI({
    summary: "Excluir relação entre turma e catequizandos",
    description: "Informe a turma desejada e o catequizando pelos seus Ids",
    responses: {
      "400": { description: "Erro na requisição" },
    },
  })
  delete(
    @BodyParam("turmaId", { required: true }) turmaId: number,
    @BodyParam("catequizandoId", { required: true }) catequizandoId: number
  ) {
    return methTurmaCatequizando.deleteOne(turmaId, catequizandoId);
  }
}
