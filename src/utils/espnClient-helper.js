const axios = require("axios");
const { ESPN_FFL_ENDPOINT } = require("./consts");
const { espnClient } = require("../espnClient");

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

const fetchLeagueEndpoint = async () => {
  const apiUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
  return axios
    .get(apiUrl, {
      headers: {
        Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
      },
    })
    .then((response) => {
      console.info("Successfully fetched league endpoint");
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

const getTeams = async (week, year = seasonId) => {
  let scoringPeriod;
  if (!week) {
    scoringPeriod = await getCurrentWeek();
  } else {
    scoringPeriod = week;
  }

  try {
    return await espnClient.getTeamsAtWeek({
      seasonId: year,
      scoringPeriodId: scoringPeriod,
    });
  } catch (error) {
    console.error("Error fetching teams:\n", error);
    throw Error("Error fetching teams.");
  }
};

const getTeamById = (id, teams) => {
  if (!teams) {
    throw Error("teams is required.");
  }
  const teamById = teams.filter((team) => team.id === id);
  return teamById[0];
};

// TODO: find workaround for inaccurate projected totals
const getProjectedTotal = (matchupRoster) => {
  const positionsToExclude = ["Bench", "IR"];
  const startingLineup = matchupRoster.filter(
    ({ position }) => !positionsToExclude.includes(position)
  );

  let projectedTotal = 0;
  startingLineup.forEach(({ projectedPointBreakdown }) => {
    for (const [key, value] of Object.entries(projectedPointBreakdown)) {
      if (key !== "usesPoints") {
        projectedTotal += value;
      }
    }
  });
  return projectedTotal;
};

const getBoxscores = async (week) => {
  let scoringPeriod;
  if (!week) {
    scoringPeriod = await getCurrentWeek();
  } else {
    scoringPeriod = week;
  }

  return await espnClient
    .getBoxscoreForWeek({
      seasonId,
      matchupPeriodId: scoringPeriod,
      scoringPeriodId: scoringPeriod,
    })
    .then(async (boxscores) => {
      const teams = await getTeams();
      boxscores.map(async (boxscore, index) => {
        const homeTeamDetails = getTeamById(boxscore.homeTeamId, teams);
        const awayTeamDetails = getTeamById(boxscore.awayTeamId, teams);
        const boxscoreResult = {
          homeTeam: {
            id: boxscore.homeTeamId,
            name: homeTeamDetails.name,
            score: boxscore.homeScore,
            abbrev: homeTeamDetails.abbreviation,
            roster: boxscore.homeRoster,
          },
          awayTeam: {
            id: boxscore.awayTeamId,
            name: awayTeamDetails.name,
            score: boxscore.awayScore,
            abbrev: awayTeamDetails.abbreviation,
            roster: boxscore.awayRoster,
          },
        };
        return (boxscores[index] = boxscoreResult);
      });
      return boxscores;
    })
    .then((boxscores) => {
      boxscores.forEach(async ({ homeTeam, awayTeam }) => {
        homeTeam.projected = getProjectedTotal(homeTeam.roster);
        awayTeam.projected = getProjectedTotal(awayTeam.roster);
      });
      return boxscores;
    })
    .catch((error) => {
      console.error("Error fetching boxscores:\n", error);
      throw Error("Error fetching boxscores.");
    });
};

module.exports = {
  fetchLeagueEndpoint,
  getCurrentWeek,
  getTeams,
  getTeamById,
  getProjectedTotal,
  getBoxscores,
};
