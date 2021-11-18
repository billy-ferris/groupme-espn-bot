import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";

const { NODE_ENV } = process.env;
import { config } from "dotenv";
config();

import middlewares from "./middlewares";
import botTaskScheduler from "./utils/botTaskScheduler";

const app: Express = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());

botTaskScheduler();

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
