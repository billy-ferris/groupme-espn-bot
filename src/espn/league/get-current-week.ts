import { getLeagueInfo } from "./get-league-info";

export const getCurrentWeek = async (): Promise<number> => {
  try {
    const { scoringPeriodId } = await getLeagueInfo();
    console.info("Successfully got current week: ", scoringPeriodId);
    return scoringPeriodId;
  } catch (error) {
    console.error("Error fetching current week:\n", error);
    throw Error("Error fetching current week.");
  }
};
