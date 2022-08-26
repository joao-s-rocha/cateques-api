// import express from "express";
import "reflect-metadata";
import { db } from "./db";

db.initialize()
  .then(() => {
    console.log("Catequese inicializado com sucesso");
  })
  .catch((error) => console.log(error));
