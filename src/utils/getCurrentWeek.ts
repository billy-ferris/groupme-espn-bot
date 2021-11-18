import getLeagueEndpoint from "./getLeagueEndpoint";

const getCurrentWeek = async (): Promise<number> => {
  try {
    const { scoringPeriodId } = await getLeagueEndpoint();
    console.info("Successfully got current week: ", scoringPeriodId);
    return scoringPeriodId;
  } catch (error) {
    console.error("Error fetching current week:\n", error);
    throw Error("Error fetching current week.");
  }
};

export default getCurrentWeek;
