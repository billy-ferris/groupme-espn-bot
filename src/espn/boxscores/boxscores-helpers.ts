import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap,
} from "./consts";
import { Matchup, MatchupTeam, Player, Team } from "../league";
import { Boxscore, BoxscorePlayer, BoxscoreTeam } from "./types";

export const roundNumber = (number: number, places?: number): number => {
  let negative = false;
  if (places === undefined) {
    places = 0;
  }
  if (number < 0) {
    negative = true;
    number = number * -1;
  }
  const multiplier = Math.pow(10, places);
  number = +parseFloat((number * multiplier).toFixed(11));
  number = +(Math.round(number) / multiplier).toFixed(2);
  if (negative) {
    number = +(number * -1).toFixed(2);
  }
  return Number(number);
};

export const createBoxscorePlayer = ({
  lineupSlotId,
  playerPoolEntry: {
    appliedStatTotal,
    player: { id, firstName, lastName, proTeamId, eligibleSlots },
  },
}: Player): BoxscorePlayer => {
  return {
    id,
    firstName,
    lastName,
    teamName: nflTeamIdToNFLTeam[proTeamId],
    teamAbbrev: nflTeamIdToNFLTeamAbbreviation[proTeamId],
    lineupSlot: slotCategoryIdToPositionMap[lineupSlotId],
    eligibleSlots: eligibleSlots.map(
      (slotId) => slotCategoryIdToPositionMap[slotId]
    ),
    totalPoints: roundNumber(appliedStatTotal, 1),
  };
};

const getTeamById = (teams: Team[], teamId: number): Team => {
  const team = teams.find((team) => team.id === teamId);
  if (!team) {
    throw Error("Failed to get team by ID.");
  }
  return team;
};

export const createBoxscoreTeam = (
  {
    teamId,
    totalPoints,
    totalPointsLive,
    totalProjectedPointsLive,
    rosterForCurrentScoringPeriod,
  }: MatchupTeam,
  teams: Team[]
): BoxscoreTeam => {
  const { playoffSeed, nickname, record, location, abbrev } = getTeamById(
    teams,
    teamId
  );
  return {
    id: teamId,
    name: `${location.trim()} ${nickname.trim()}`,
    abbrev: abbrev,
    playoffSeed: playoffSeed,
    record: record.overall,
    totalPoints: roundNumber(totalPoints, 1),
    totalPointsLive: roundNumber(totalPointsLive, 1),
    totalProjectedPointsLive: roundNumber(totalProjectedPointsLive, 1),
    roster: rosterForCurrentScoringPeriod.entries.map((player) =>
      createBoxscorePlayer(player)
    ),
  };
};

export const createBoxscore = (
  { home, away }: Matchup,
  teams: Team[]
): Boxscore => {
  const boxscoreObj = {} as Boxscore;
  Object.entries({ home, away }).map(
    ([key, team]) =>
      (boxscoreObj[`${key}Team`] = createBoxscoreTeam(team, teams))
  );
  return boxscoreObj;
};

export const getBoxscoresResult = ({
  teams,
  schedule,
  scoringPeriod,
}: {
  teams: Team[];
  schedule: Matchup[];
  scoringPeriod: number;
}): Boxscore[] => {
  const matchups = schedule.filter(
    ({ matchupPeriodId }) => matchupPeriodId === scoringPeriod
  );
  return matchups.map((matchup) => createBoxscore(matchup, teams));
};
