import { AppDataSource } from "./data-source";
import * as express from "express";
import routes from "./route";
import "dotenv/config";
import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    const corsConfig = {
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use("/api/v1", routes);

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port : ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
