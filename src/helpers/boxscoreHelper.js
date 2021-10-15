const _ = require("lodash");
const { fetchLeagueEndpoint, getCurrentWeek } = require("./leagueHelper");
const {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap,
} = require("../consts");

const parseBoxscoresResponse = ({ teams, schedule }, week) => {
  const matchups = _.filter(schedule, {
    matchupPeriodId: week,
  });
  return _.map(matchups, (matchup) => mapBoxscoreObject(matchup, teams));
};

const mapBoxscorePlayerObject = ({
  lineupSlotId,
  playerPoolEntry: {
    appliedStatTotal,
    player: { id, firstName, lastName, proTeamId, eligibleSlots },
  },
}) => {
  return {
    id,
    firstName,
    lastName,
    teamName: _.get(nflTeamIdToNFLTeam, proTeamId),
    teamAbbrev: _.get(nflTeamIdToNFLTeamAbbreviation, proTeamId),
    lineupSlot: _.get(slotCategoryIdToPositionMap, lineupSlotId),
    eligibleSlots: _.map(eligibleSlots, (slotId) =>
      _.get(slotCategoryIdToPositionMap, slotId)
    ),
    totalPoints: appliedStatTotal,
  };
};

const mapBoxscoreTeamObject = (
  {
    teamId,
    totalPoints,
    totalPointsLive,
    totalProjectedPointsLive,
    rosterForCurrentScoringPeriod: { entries },
  },
  teams
) => {
  const {
    location,
    nickname,
    abbrev,
    playoffSeed,
    record: { overall },
  } = _.find(teams, (team) => teamId === team.id);
  return {
    id: teamId,
    name: `${location.trim()} ${nickname.trim()}`,
    abbrev,
    playoffSeed,
    record: overall,
    totalPoints,
    totalPointsLive,
    totalProjectedPointsLive,
    roster: _.map(entries, (player) => mapBoxscorePlayerObject(player)),
  };
};

const mapBoxscoreObject = ({ away, home }, teams) => {
  let boxscoreObject = {};
  _.map(
    { away, home },
    (team, key) =>
      (boxscoreObject[`${key}Team`] = mapBoxscoreTeamObject(team, teams))
  );
  return boxscoreObject;
};

const getBoxscores = async (week) => {
  let scoringPeriod;
  if (!week) {
    scoringPeriod = await getCurrentWeek();
  } else {
    scoringPeriod = week;
  }

  const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
  try {
    const boxscoresResponse = await fetchLeagueEndpoint(urlParams);
    return parseBoxscoresResponse(boxscoresResponse, scoringPeriod);
  } catch (error) {
    console.error("Error fetching boxscores:\n", error);
    throw Error("Error fetching boxscores.");
  }
};

module.exports = {
  getBoxscores,
  parseBoxscoresResponse,
  mapBoxscoreObject,
  mapBoxscoreTeamObject,
  mapBoxscorePlayerObject,
};
