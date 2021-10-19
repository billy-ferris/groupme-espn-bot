const axios = require("axios");
const { getBoxscores } = require("./getBoxscores");

jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

describe("getBoxscores function", () => {
  const week = 1;
  const expectedAxiosResponse = {
    data: {
      gameId: 1,
      id: 56951748,
      schedule: [
        {
          home: {
            teamId: 1,
            totalPoints: 0,
            totalPointsLive: 0,
            totalProjectedPointsLive: 0,
            rosterForCurrentScoringPeriod: {
              entries: [
                {
                  lineupSlotId: 2,
                  playerId: 3043078,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3043078,
                      eligibleSlots: [2, 3, 23, 7, 20, 21],
                      firstName: "Derrick",
                      lastName: "Henry",
                      fullName: "Derrick Henry",
                      proTeamId: 10,
                    },
                  },
                },
                {
                  lineupSlotId: 4,
                  playerId: 3116406,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3116406,
                      eligibleSlots: [3, 4, 5, 23, 7, 20, 21],
                      firstName: "Tyreek",
                      lastName: "Hill",
                      fullName: "Tyreek Hill",
                      proTeamId: 12,
                    },
                  },
                },
              ],
            },
          },
          away: {
            teamId: 2,
            totalPoints: 0,
            totalPointsLive: 0,
            totalProjectedPointsLive: 0,
            rosterForCurrentScoringPeriod: {
              entries: [
                {
                  lineupSlotId: 2,
                  playerId: 3043078,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3043078,
                      eligibleSlots: [2, 3, 23, 7, 20, 21],
                      firstName: "Derrick",
                      lastName: "Henry",
                      fullName: "Derrick Henry",
                      proTeamId: 10,
                    },
                  },
                },
                {
                  lineupSlotId: 4,
                  playerId: 3116406,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3116406,
                      eligibleSlots: [3, 4, 5, 23, 7, 20, 21],
                      firstName: "Tyreek",
                      lastName: "Hill",
                      fullName: "Tyreek Hill",
                      proTeamId: 12,
                    },
                  },
                },
              ],
            },
          },
          id: 1,
          matchupPeriodId: week,
        },
        {
          home: {
            teamId: 3,
            totalPoints: 0,
            totalPointsLive: 0,
            totalProjectedPointsLive: 0,
            rosterForCurrentScoringPeriod: {
              entries: [
                {
                  lineupSlotId: 2,
                  playerId: 3043078,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3043078,
                      eligibleSlots: [2, 3, 23, 7, 20, 21],
                      firstName: "Derrick",
                      lastName: "Henry",
                      fullName: "Derrick Henry",
                      proTeamId: 10,
                    },
                  },
                },
                {
                  lineupSlotId: 4,
                  playerId: 3116406,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3116406,
                      eligibleSlots: [3, 4, 5, 23, 7, 20, 21],
                      firstName: "Tyreek",
                      lastName: "Hill",
                      fullName: "Tyreek Hill",
                      proTeamId: 12,
                    },
                  },
                },
              ],
            },
          },
          away: {
            teamId: 4,
            totalPoints: 0,
            totalPointsLive: 0,
            totalProjectedPointsLive: 0,
            rosterForCurrentScoringPeriod: {
              entries: [
                {
                  lineupSlotId: 2,
                  playerId: 3043078,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3043078,
                      eligibleSlots: [2, 3, 23, 7, 20, 21],
                      firstName: "Derrick",
                      lastName: "Henry",
                      fullName: "Derrick Henry",
                      proTeamId: 10,
                    },
                  },
                },
                {
                  lineupSlotId: 4,
                  playerId: 3116406,
                  playerPoolEntry: {
                    appliedStatTotal: 0,
                    onTeamId: 11,
                    player: {
                      id: 3116406,
                      eligibleSlots: [3, 4, 5, 23, 7, 20, 21],
                      firstName: "Tyreek",
                      lastName: "Hill",
                      fullName: "Tyreek Hill",
                      proTeamId: 12,
                    },
                  },
                },
              ],
            },
          },
          id: 2,
          matchupPeriodId: week,
        },
      ],
      teams: [
        {
          id: 1,
          location: "test",
          nickname: "entry",
          abbrev: "TST",
          record: { overall: { wins: 1, losses: 0, ties: 0 } },
          playoffSeed: 1,
        },
        {
          id: 2,
          location: "test",
          nickname: "entry 2",
          abbrev: "TST2",
          record: { overall: { wins: 1, losses: 0, ties: 0 } },
          playoffSeed: 2,
        },
        {
          id: 3,
          location: "test",
          nickname: "entry 3",
          abbrev: "TST3",
          record: { overall: { wins: 1, losses: 0, ties: 0 } },
          playoffSeed: 3,
        },
        {
          id: 4,
          location: "test",
          nickname: "entry 4",
          abbrev: "TST4",
          record: { overall: { wins: 1, losses: 0, ties: 0 } },
          playoffSeed: 4,
        },
      ],
    },
  };
  const expectedBoxscoreArray = [
    {
      homeTeam: {
        id: 1,
        name: "test entry",
        abbrev: "TST",
        playoffSeed: 1,
        totalPoints: 0,
        totalPointsLive: 0,
        totalProjectedPointsLive: 0,
        record: {
          wins: 1,
          losses: 0,
          ties: 0,
        },
        roster: [
          {
            eligibleSlots: ["RB", "RB/WR", "RB/WR/TE", "OP", "Bench", "IR"],
            firstName: "Derrick",
            id: 3043078,
            lastName: "Henry",
            lineupSlot: "RB",
            teamAbbrev: "TEN",
            teamName: "Tennessee Titans",
            totalPoints: 0,
          },
          {
            eligibleSlots: [
              "RB/WR",
              "WR",
              "WR/TE",
              "RB/WR/TE",
              "OP",
              "Bench",
              "IR",
            ],
            firstName: "Tyreek",
            id: 3116406,
            lastName: "Hill",
            lineupSlot: "WR",
            teamAbbrev: "KC",
            teamName: "Kansas City Chiefs",
            totalPoints: 0,
          },
        ],
      },
      awayTeam: {
        id: 2,
        name: "test entry 2",
        abbrev: "TST2",
        playoffSeed: 2,
        totalPoints: 0,
        totalPointsLive: 0,
        totalProjectedPointsLive: 0,
        record: {
          wins: 1,
          losses: 0,
          ties: 0,
        },
        roster: [
          {
            eligibleSlots: ["RB", "RB/WR", "RB/WR/TE", "OP", "Bench", "IR"],
            firstName: "Derrick",
            id: 3043078,
            lastName: "Henry",
            lineupSlot: "RB",
            teamAbbrev: "TEN",
            teamName: "Tennessee Titans",
            totalPoints: 0,
          },
          {
            eligibleSlots: [
              "RB/WR",
              "WR",
              "WR/TE",
              "RB/WR/TE",
              "OP",
              "Bench",
              "IR",
            ],
            firstName: "Tyreek",
            id: 3116406,
            lastName: "Hill",
            lineupSlot: "WR",
            teamAbbrev: "KC",
            teamName: "Kansas City Chiefs",
            totalPoints: 0,
          },
        ],
      },
    },
    {
      homeTeam: {
        id: 3,
        name: "test entry 3",
        abbrev: "TST3",
        playoffSeed: 3,
        totalPoints: 0,
        totalPointsLive: 0,
        totalProjectedPointsLive: 0,
        record: {
          wins: 1,
          losses: 0,
          ties: 0,
        },
        roster: [
          {
            eligibleSlots: ["RB", "RB/WR", "RB/WR/TE", "OP", "Bench", "IR"],
            firstName: "Derrick",
            id: 3043078,
            lastName: "Henry",
            lineupSlot: "RB",
            teamAbbrev: "TEN",
            teamName: "Tennessee Titans",
            totalPoints: 0,
          },
          {
            eligibleSlots: [
              "RB/WR",
              "WR",
              "WR/TE",
              "RB/WR/TE",
              "OP",
              "Bench",
              "IR",
            ],
            firstName: "Tyreek",
            id: 3116406,
            lastName: "Hill",
            lineupSlot: "WR",
            teamAbbrev: "KC",
            teamName: "Kansas City Chiefs",
            totalPoints: 0,
          },
        ],
      },
      awayTeam: {
        id: 4,
        name: "test entry 4",
        abbrev: "TST4",
        playoffSeed: 4,
        totalPoints: 0,
        totalPointsLive: 0,
        totalProjectedPointsLive: 0,
        record: {
          wins: 1,
          losses: 0,
          ties: 0,
        },
        roster: [
          {
            eligibleSlots: ["RB", "RB/WR", "RB/WR/TE", "OP", "Bench", "IR"],
            firstName: "Derrick",
            id: 3043078,
            lastName: "Henry",
            lineupSlot: "RB",
            teamAbbrev: "TEN",
            teamName: "Tennessee Titans",
            totalPoints: 0,
          },
          {
            eligibleSlots: [
              "RB/WR",
              "WR",
              "WR/TE",
              "RB/WR/TE",
              "OP",
              "Bench",
              "IR",
            ],
            firstName: "Tyreek",
            id: 3116406,
            lastName: "Hill",
            lineupSlot: "WR",
            teamAbbrev: "KC",
            teamName: "Kansas City Chiefs",
            totalPoints: 0,
          },
        ],
      },
    },
  ];

  it("should return the correctly formatted boxscore response of week", async () => {
    axios.get.mockResolvedValueOnce(expectedAxiosResponse);
    await expect(getBoxscores(week)).resolves.toEqual(expectedBoxscoreArray);
  });

  it("should log and throw an error on failure", async () => {
    const expectedError = new Error("Error fetching boxscores.");
    await expect(getBoxscores(week)).rejects.toEqual(expectedError);
    expect(consoleErrorSpyOn).toBeCalledTimes(1);
  });
});
