import getLeagueEndpoint from "../utils/getLeagueEndpoint";
import getCurrentWeek from "../utils/getCurrentWeek";
import { parseBoxscoresResponse } from "./helpers/boxscoreHelper";
import { Boxscore } from "../types";

const getBoxscores = async (week?: number): Promise<Boxscore[]> => {
  let scoringPeriod;
  if (!week) {
    scoringPeriod = await getCurrentWeek();
  } else {
    scoringPeriod = week;
  }

  const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
  try {
    const boxscoresResponse = await getLeagueEndpoint(urlParams);
    return parseBoxscoresResponse(boxscoresResponse, scoringPeriod);
  } catch (error) {
    console.error("Error fetching boxscores:\n", error);
    throw Error("Error fetching boxscores.");
  }
};

export default getBoxscores;
