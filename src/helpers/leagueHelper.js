const axios = require("axios");
const { ESPN_FFL_ENDPOINT } = require("../consts");

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

const fetchLeagueEndpoint = async (params) => {
  let apiUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
  if (params) {
    apiUrl += params;
  }
  return axios
    .get(apiUrl, {
      headers: {
        Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching league endpoint:\n", error);
      throw Error("Error fetching league endpoint.");
    });
};

const getCurrentWeek = async () => {
  try {
    const { scoringPeriodId } = await fetchLeagueEndpoint();
    console.info("Successfully got current week: ", scoringPeriodId);
    return scoringPeriodId;
  } catch (error) {
    console.error("Error fetching current week:\n", error);
    throw Error("Error fetching current week.");
  }
};

module.exports = {
  fetchLeagueEndpoint,
  getCurrentWeek,
};
