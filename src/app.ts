import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { db } from "./db";
import { CatequizandoController } from "./controllers/catequizando";
import bodyParser from "body-parser";
import path from "path";

db.initialize()
  .then(() => {
    console.log("Catequese inicializado com sucesso");
  })
  .catch((error) => console.log(error));

const app = express();
app.use(bodyParser.json);
useExpressServer(app, {
  routePrefix: "/api",
  controllers: [CatequizandoController],
});

app.listen(3000);
