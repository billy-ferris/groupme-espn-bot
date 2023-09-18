import { Matchup, MatchupTeam, Player, Team } from "../league";
import { Boxscore, BoxscorePlayer, BoxscoreTeam } from "./types";
export declare const roundNumber: (number: number, places?: number) => number;
export declare const createBoxscorePlayer: ({ lineupSlotId, playerPoolEntry: { appliedStatTotal, player: { id, firstName, lastName, proTeamId, eligibleSlots }, }, }: Player) => BoxscorePlayer;
export declare const createBoxscoreTeam: ({ teamId, totalPoints, totalPointsLive, totalProjectedPointsLive, rosterForCurrentScoringPeriod, }: MatchupTeam, teams: Team[]) => BoxscoreTeam;
export declare const createBoxscore: ({ home, away }: Matchup, teams: Team[]) => Boxscore;
export declare const getBoxscoresResult: ({ teams, schedule, scoringPeriod, }: {
    teams: Team[];
    schedule: Matchup[];
    scoringPeriod: number;
}) => Boxscore[];
