import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import express from "express";
import { db } from "./db";
import bodyParser from "body-parser";
import path from "path";

import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { useExpressServer, getMetadataArgsStorage } from "routing-controllers";
import * as swaggerUiExpress from "swagger-ui-express";
import { defaultMetadataStorage } from "class-transformer/storage";

// import { SacramentoController } from "./controllers/sacramento";
// import { CatequizandoController } from "./controllers/catequizando";
import { TurmaController } from "./controllers/turma";
import { UsuarioController } from "./controllers/usuario";

const routingControllersOptions = {
  controllers: [TurmaController, UsuarioController],
  routePrefix: "/api",
};

db.initialize()
  .then(() => {
    console.log("Catequese inicializado com sucesso");
  })
  .catch((error) => console.log(error));

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
    title: "API Tipagem Log de Estoque",
    version: "1.0.0",
  },
});

app.use(bodyParser.json());
// app.use(express.json({ limit: "50mb" }));

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

useExpressServer(app, {
  routePrefix: "/api",
  controllers: [path.join(__dirname + "/controllers/*.ts")],
});

app.listen(3000);
