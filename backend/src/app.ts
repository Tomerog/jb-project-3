import express, { json } from "express";
import config from "config";
import sequelize from "./db/sequelize";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import cors from "cors";
import vacationsRouter from "./routers/vacations";
import authRouter from "./routers/auth";
import followsRouter from "./routers/follows";
import fileUpload from "express-fileupload";
import { createAppBucketIfNotExist } from "./aws/aws";

const force = config.get<boolean>("sequelize.sync.force");

const app = express();

export async function start() {
  try {
    await sequelize.sync({ force });

    await createAppBucketIfNotExist();

    app.use(cors());

    app.use(json());
    app.use(fileUpload());

    app.use("/auth", authRouter);
    app.use("/vacations", vacationsRouter);
    app.use("/follows", followsRouter);

    app.use(notFound);

    app.use(errorLogger);
    app.use(errorResponder);
  } catch (error) {
    console.log(error);
  }
}

export default app;
