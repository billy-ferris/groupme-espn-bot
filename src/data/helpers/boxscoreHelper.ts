import _ from "lodash";
import roundNumberTo from "../../utils/roundNumberTo";
import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap,
} from "../../consts";

export const parseBoxscoresResponse = ({ teams, schedule }: any, week: any) => {
  const matchups = _.filter(schedule, {
    matchupPeriodId: week,
  });
  return _.map(matchups, (matchup) => mapBoxscoreObject(matchup, teams));
};

export const mapBoxscorePlayerObject = ({
  lineupSlotId,
  playerPoolEntry: {
    appliedStatTotal,
    player: { id, firstName, lastName, proTeamId, eligibleSlots },
  },
}: any) => {
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

export const mapBoxscoreTeamObject = (
  {
    teamId,
    totalPoints,
    totalPointsLive,
    totalProjectedPointsLive,
    rosterForCurrentScoringPeriod: { entries },
  }: any,
  teams: any
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

export const mapBoxscoreObject = ({ away, home }: any, teams: any) => {
  const boxscoreObject: Record<string, unknown> = {};
  _.map(
    { away, home },
    (team, key) =>
      (boxscoreObject[`${key}Team`] = mapBoxscoreTeamObject(team, teams))
  );
  return boxscoreObject;
};
