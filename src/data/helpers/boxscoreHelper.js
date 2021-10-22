const _ = require("lodash");
const roundNumberTo = require("../../utils/roundNumberTo");
const {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap,
} = require("../../consts");

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
    totalPoints: roundNumberTo(appliedStatTotal, 1),
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
    totalPoints: roundNumberTo(totalPoints, 1),
    totalPointsLive: roundNumberTo(totalPointsLive, 1),
    totalProjectedPointsLive: roundNumberTo(totalProjectedPointsLive, 1),
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

module.exports = {
  parseBoxscoresResponse,
  mapBoxscoreObject,
  mapBoxscoreTeamObject,
  mapBoxscorePlayerObject,
};
