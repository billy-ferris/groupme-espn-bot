import { getBoxscoresResult } from "./boxscores-helpers";
import { Boxscore } from "./types";
import { getCurrentWeek, getLeagueInfo } from "../league";

export const getBoxscores = async (
  scoringPeriod?: number
): Promise<Boxscore[]> => {
  if (!scoringPeriod) {
    scoringPeriod = await getCurrentWeek();
  }

  const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;

  try {
    const { teams, schedule } = await getLeagueInfo(urlParams);
    return getBoxscoresResult({
      teams,
      schedule,
      scoringPeriod,
    });
  } catch (error) {
    console.error("Error fetching boxscores:\n", error);
    throw new Error("Error fetching boxscores. See console for details.");
  }
};
