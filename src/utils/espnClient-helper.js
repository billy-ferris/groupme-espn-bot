const axios = require("axios");
const { ESPN_FFL_ENDPOINT } = require("./consts");
const { espnClient } = require("../espnClient");

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SEASON_ID, SWID, ESPN_S2 } = process.env;

const fetchLeagueEndpoint = async () => {
  const apiUrl = `${ESPN_FFL_ENDPOINT}/seasons/${SEASON_ID}/segments/0/leagues/${LEAGUE_ID}`;
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

const getTeams = async (year, week) => {
  let scoringPeriod = week;
  if (!week) {
    scoringPeriod = await getCurrentWeek();
  }
  return espnClient.getTeamsAtWeek({
    seasonId: year,
    scoringPeriodId: scoringPeriod,
  });
};

const getTeamById = (id, teams) => {
  if (teams) {
    const teamById = teams.filter((team) => team.id === id);
    return teamById[0];
  }
  throw Error("teams is required");
};

const getProjectedTotal = async (roster) => {
  let projectedTotal = 0;
  const positionsToExclude = ["Bench", "IR"];
  const startingLineup = roster.filter(
    ({ position }) => !positionsToExclude.includes(position)
  );

  startingLineup.forEach(({ projectedPointBreakdown }) => {
    projectedTotal += Object.values(projectedPointBreakdown).reduce(
      (sum, projectedPoints) => {
        return sum + projectedPoints;
      },
      0
    );
  });

  return Math.round(projectedTotal * 10) / 10;
};

const getBoxscore = async () =>
  espnClient
    .getBoxscoreForWeek({
      seasonId,
      matchupPeriodId: 4,
      scoringPeriodId: 4,
    })
    .then(async (boxscores) => {
      const teams = await getTeams(seasonId);
      boxscores.map(async (boxscore, index) => {
        const homeTeamDetails = await getTeamById(boxscore.homeTeamId, teams);
        const awayTeamDetails = await getTeamById(boxscore.awayTeamId, teams);
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
        homeTeam.projected = await getProjectedTotal(homeTeam.roster);
        awayTeam.projected = await getProjectedTotal(awayTeam.roster);
      });
      return boxscores;
    });

module.exports = {
  fetchLeagueEndpoint,
  getCurrentWeek,
  getTeams,
  getTeamById,
  getProjectedTotal,
  getBoxscore,
};
