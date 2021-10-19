const { createMatchupStringsArray } = require("./matchupsHelper");

describe("createMatchupsString function", () => {
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

  it("should return array of matchup strings", async () => {
    const expectedMatchupStringsArray = [
      "test entry 2 (1-0, 2nd) vs test entry (1-0, 1st)",
      "test entry 4 (1-0, 4th) vs test entry 3 (1-0, 3rd)",
    ];
    expect(createMatchupStringsArray(expectedBoxscoreArray)).toEqual(
      expectedMatchupStringsArray
    );
  });
});
