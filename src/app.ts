import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { db } from "./db";
import { CatequizandoController } from "./controllers/catequizando";
import bodyParser from "body-parser";

// const app = express();
const app = createExpressServer({
  controllers: [CatequizandoController],
});

db.initialize()
  .then(() => {
    console.log("Catequese inicializado com sucesso");
  })
  .catch((error) => console.log(error));

app.use(bodyParser.json);
app.listen(3000);
