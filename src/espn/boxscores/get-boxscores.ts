import { getBoxscoresResult } from "./boxscores-helpers";
import { Boxscore } from "./types";
import { getCurrentWeek, getLeagueInfo } from "../league";

export const getBoxscores = async (
  scoringPeriod?: number
): Promise<Boxscore[]> => {
  let week;
  if (!scoringPeriod) {
    week = await getCurrentWeek();
  } else {
    week = scoringPeriod;
  }

  const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
  try {
    const { teams, schedule } = await getLeagueInfo(urlParams);
    return getBoxscoresResult({
      teams,
      schedule,
      scoringPeriod: week,
    });
  } catch (error) {
    console.error("Error fetching boxscores:\n", error);
    throw Error("Error fetching boxscores.");
  }
};
