// import express from "express";
import express from "express";
import "reflect-metadata";
import { db } from "./db";

const app = express();

db.initialize()
  .then(() => {
    console.log("Catequese inicializado com sucesso");
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.listen(3000);
