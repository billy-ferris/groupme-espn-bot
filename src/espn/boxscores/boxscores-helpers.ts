import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap,
} from "./consts";
import { Matchup, MatchupTeam, Player, Team } from "../league";
import { Boxscore, BoxscorePlayer, BoxscoreTeam } from "./types";

export const roundNumber = (number: number, places: number = 0): number => {
  const multiplier = Math.pow(10, places);
  return Number((Math.round(number * multiplier) / multiplier).toFixed(2));
};

export const createBoxscorePlayer = ({
  lineupSlotId,
  playerPoolEntry: {
    appliedStatTotal,
    player: { id, firstName, lastName, proTeamId, eligibleSlots },
  },
}: Player): BoxscorePlayer => ({
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
});

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
  const { playoffSeed, name, record, abbrev } = getTeamById(teams, teamId);
  return {
    id: teamId,
    name,
    abbrev,
    playoffSeed,
    record: record.overall,
    totalPoints: roundNumber(totalPoints, 1),
    totalPointsLive: roundNumber(totalPointsLive, 1),
    totalProjectedPointsLive: roundNumber(totalProjectedPointsLive, 1),
    roster: rosterForCurrentScoringPeriod.entries.map(createBoxscorePlayer),
  };
};

export const createBoxscore = (
  { home, away }: Matchup,
  teams: Team[]
): Boxscore => ({
  homeTeam: createBoxscoreTeam(home, teams),
  awayTeam: createBoxscoreTeam(away, teams),
});

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
