import "reflect-metadata";
import express from "express";
import { baseOptions, db, optionsDataSource } from "./db";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { buildDataSourceOptions, createDatabase } from "typeorm-extension";

import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { useExpressServer, getMetadataArgsStorage } from "routing-controllers";
import * as swaggerUiExpress from "swagger-ui-express";
import { defaultMetadataStorage } from "class-transformer/storage";

import { CatequizandoController } from "./controllers/catequizando";
import { TurmaController } from "./controllers/turma";
import { UsuarioController } from "./controllers/usuario";
import { TurmaCatequistaController } from "./controllers/turmaCatequista";
import { SacramentoController } from "./controllers/sacramento";
import { DocumentosController } from "./controllers/documentos";
import { TurmaCatequizandoController } from "./controllers/turmaCatequizando";
import { Login } from "./controllers/login";
import dotenv from "dotenv";

dotenv.config();

const routingControllersOptions = {
  controllers: [
    TurmaController,
    TurmaCatequistaController,
    TurmaCatequizandoController,
    UsuarioController,
    CatequizandoController,
    SacramentoController,
    DocumentosController,
    Login,
  ],
  routePrefix: "/api",
};

createDatabase({
  ifNotExist: true,
  options: baseOptions,
}).finally(() =>
  db
    .initialize()
    .then(() => {
      console.log("Catequese inicializado com sucesso");
    })
    .catch((error) => console.log(error))
);

const app = express();

const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: "#/components/schemas/",
});

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
  },
  info: {
    description: "Generated with `routing-controllers-openapi`",
    title: "API Catequese",
    version: "1.0.0",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

useExpressServer(app, {
  routePrefix: "/api",
  controllers: [path.join(__dirname + "/controllers/*.ts")],
});

app.listen(3001);
