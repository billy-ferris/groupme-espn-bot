const axios = require("axios");
const { BASE_ESPN_ENDPOINT } = require("./consts");

const { LEAGUE_ID, SEASON_ID, SWID, ESPN_S2 } = process.env;

const fetchLeagueEndpoint = async () => {
  const apiUrl = `${BASE_ESPN_ENDPOINT}/seasons/${SEASON_ID}/segments/0/leagues/${LEAGUE_ID}`;

  const data = await axios
    .get(apiUrl, {
      headers: {
        Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw Error(err);
    });

  return data;
};

const getCurrentWeek = async () => {
  const { scoringPeriodId } = await fetchLeagueEndpoint();

  return scoringPeriodId;
};

module.exports = {
  getCurrentWeek,
};
