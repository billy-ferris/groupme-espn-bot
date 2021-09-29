const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { NODE_ENV } = process.env;

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api/v1");
const { espnClient } = require("./espnClient");
const { getCurrentWeek } = require("./utils/api-helper");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

const seasonId = Number(process.env.SEASON_ID);

const getTeams = async (year, week) => {
  let scoringPeriod = week;
  if (!week) {
    scoringPeriod = await getCurrentWeek();
    console.log("if");
  }

  const teamsObj = await espnClient
    .getTeamsAtWeek({
      seasonId: year,
      scoringPeriodId: scoringPeriod,
    })
    .then((teams) => teams);

  return teamsObj;
};

app.get("/", (req, res) => {
  res.json({
    message: "/",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
