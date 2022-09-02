import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { db } from "./db";
import bodyParser from "body-parser";
import path from "path";

db.initialize()
  .then(() => {
    console.log("Catequese inicializado com sucesso");
  })
  .catch((error) => console.log(error));

// const app = express();

const app = createExpressServer({
  routePrefix: "/api",
  controllers: [path.join(__dirname + "/controllers/*.ts")],
});
app.use(bodyParser.json);
app.listen(3080);
