const { getLeagueEndpoint } = require("../utils/getLeagueEndpoint");
const { getCurrentWeek } = require("../utils/getCurrentWeek");
const { parseBoxscoresResponse } = require("./helpers/boxscoreHelper");

const getBoxscores = async (week) => {
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

module.exports = {
  getBoxscores,
};
