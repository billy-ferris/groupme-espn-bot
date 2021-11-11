export interface LeagueEndpointTeam {
  id: number;
  abbrev: string;
  location: string;
  nickname: string;
  record: {
    overall: {
      wins: number;
      losses: number;
      ties: number;
    };
  };
  playoffSeed: 1;
}

export interface LeagueEndpointPlayer {
  lineupSlotId: number;
  playerId: number;
  playerPoolEntry: {
    appliedStatTotal: number;
    onTeamId: number;
    player: {
      id: number;
      eligibleSlots: number[];
      firstName: string;
      lastName: string;
      fullName: string;
      proTeamId: number;
    };
  };
}

export interface LeagueEndpointScheduleTeam {
  teamId: number;
  totalPoints: number;
  totalPointsLive: number;
  totalProjectedPointsLive: number;
  rosterForCurrentScoringPeriod: {
    entries: LeagueEndpointPlayer[];
  };
}

export interface LeagueEndpointSchedule {
  id: number;
  matchupPeriodId: number;
  home: LeagueEndpointScheduleTeam;
  away: LeagueEndpointScheduleTeam;
}

export interface LeagueEndpointData extends Record<string, unknown> {
  draftDetail?: {
    drafted?: boolean;
    inProgress?: boolean;
  };
  gameId: number;
  id: number;
  members: unknown[];
  scoringPeriodId: number;
  seasonId: number;
  segmentId: number;
  settings: Record<string, unknown>;
  status: Record<string, unknown>;
  teams: LeagueEndpointTeam[];
  schedule?: LeagueEndpointSchedule[];
}

/* Boxscores */
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
