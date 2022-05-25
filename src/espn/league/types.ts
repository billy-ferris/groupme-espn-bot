export interface Team {
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
  playoffSeed: number;
}

export interface Player {
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

export interface MatchupTeam {
  teamId: number;
  totalPoints: number;
  totalPointsLive: number;
  totalProjectedPointsLive: number;
  rosterForCurrentScoringPeriod: {
    entries: Player[];
  };
}

export interface Matchup {
  id: number;
  matchupPeriodId: number;
  home: MatchupTeam;
  away: MatchupTeam;
}

export interface LeagueInfo {
  draftDetail?: {
    drafted?: boolean;
    inProgress?: boolean;
  };
  gameId: number;
  id: number;
  members?: unknown[];
  scoringPeriodId: number;
  seasonId: number;
  segmentId: number;
  settings: Record<string, unknown>;
  status: Record<string, unknown>;
  teams: Team[];
  schedule: Matchup[];
}
