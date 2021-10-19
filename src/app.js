const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { NODE_ENV } = process.env;

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api/v1");
const botTaskScheduler = require("./utils/botTaskScheduler");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "/",
  });
});

// botTaskScheduler();

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
