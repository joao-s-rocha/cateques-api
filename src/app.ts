import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { db } from "./db";
import { CatequizandoController } from "./controllers/catequizando";
import bodyParser from "body-parser";
import path from "path";

const app = express();
useExpressServer(app, {
  routePrefix: "/api",
  controllers: [path.join(__dirname + "/controllers/*.ts")],
});

db.initialize()
  .then(() => {
    console.log("Catequese inicializado com sucesso");
  })
  .catch((error) => console.log(error));

app.use(bodyParser.json);
app.listen(3000);
