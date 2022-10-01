// import { isEmpty, isNull } from "lodash";
// import { HttpError } from "routing-controllers";
// import { db } from "../../db";
// import { Turma } from "../../entities/turma";
// import { Usuario } from "../../entities/usuario";
// import { TurmaCatequista } from "../../entities/turmaCatequista";

// const repTurmaCatequista = db.getRepository(TurmaCatequista);
// const repUsuario = db.getRepository(Usuario);
// const repTurma = db.getRepository(Turma);

// export async function putOne(idsUsuarios: number[], idTurma: number, idTurmaCatequista: number) {
//   const usuarioExistentes = await repUsuario.findOneBy({ idsUsuarios });

//   if (isEmpty(usuario) || isNull(usuario)) {
//     throw new HttpError(404, "Usuário não encontrado");
//   }

//   try {
//     return repository.save(repository.create(tur));
//   } catch (err: any) {
//     throw new HttpError(400, "Falha na requisição de modificação");
//   }
// }
