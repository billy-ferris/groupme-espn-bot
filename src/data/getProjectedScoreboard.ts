import _ from "lodash";
import getBoxscores from "./getBoxscores";
import { Boxscore } from "../types";

const createProjectedScoreboardStringsArray = (
  boxscores: Boxscore[]
): string[] => {
  return _.map(
    boxscores,
    ({ homeTeam, awayTeam }) =>
      `${awayTeam.abbrev} ${awayTeam.totalProjectedPointsLive} - ${homeTeam.totalProjectedPointsLive} ${homeTeam.abbrev}`
  );
};

const createProjectedScoreboardResponse = async (
  week?: number
): Promise<string> => {
  const title = "Projected Scores:";
  const boxscores = await getBoxscores(week);
  const scoreboards = createProjectedScoreboardStringsArray(boxscores);
  return title + "\n" + scoreboards.join("\n");
};

const getProjectedScoreboard = (week?: number) => {
  try {
    return createProjectedScoreboardResponse(week);
  } catch (error) {
    console.error("Error fetching scoreboard:\n", error);
    throw Error("Error fetching scoreboard.");
  }
};

export default getProjectedScoreboard;
