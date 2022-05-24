import _ from "lodash";
import getBoxscores from "./getBoxscores";
import { Boxscore } from "../types";

const createScoreboardStringsArray = (boxscores: Boxscore[]): string[] => {
  return _.map(
    boxscores,
    ({ homeTeam, awayTeam }) =>
      `${awayTeam.abbrev} ${awayTeam.totalPointsLive} - ${homeTeam.totalPointsLive} ${homeTeam.abbrev}`
  );
};

const createScoreboardResponse = async (week?: number): Promise<string> => {
  const title = "Score Update:";
  const boxscores = await getBoxscores(week);
  const scoreboards = createScoreboardStringsArray(boxscores);
  return title + "\n" + scoreboards.join("\n");
};

const getScoreboard = (week?: number) => {
  try {
    return createScoreboardResponse(week);
  } catch (error) {
    console.error("Error fetching scoreboard:\n", error);
    throw Error("Error fetching scoreboard.");
  }
};

export default getScoreboard;
