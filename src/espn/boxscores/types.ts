export interface BoxscorePlayer {
  eligibleSlots: string[];
  firstName: string;
  id: number;
  lastName: string;
  lineupSlot: string;
  teamAbbrev: string;
  teamName: string;
  totalPoints: number;
}

export interface BoxscoreTeam {
  id: number;
  name: string;
  abbrev: string;
  playoffSeed: number;
  totalPoints: number;
  totalPointsLive: number;
  totalProjectedPointsLive: number;
  record: {
    wins: number;
    losses: number;
    ties: number;
  };
  roster: BoxscorePlayer[];
}

export interface Boxscore extends Record<string, unknown> {
  homeTeam: BoxscoreTeam;
  awayTeam: BoxscoreTeam;
}
