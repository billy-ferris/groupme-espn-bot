const { getLeagueEndpoint } = require("./getLeagueEndpoint");

const getCurrentWeek = async () => {
  try {
    const { scoringPeriodId } = await getLeagueEndpoint();
    console.info("Successfully got current week: ", scoringPeriodId);
    return scoringPeriodId;
  } catch (error) {
    console.error("Error fetching current week:\n", error);
    throw Error("Error fetching current week.");
  }
};

module.exports = {
  getCurrentWeek,
};
