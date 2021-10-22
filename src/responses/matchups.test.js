const handleMatchupsResponse = require("./matchups");
const axios = require("axios");
const { BASE_GROUPME_ENDPOINT } = require("../consts");

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const consoleInfoSpyOn = jest.spyOn(console, "info").mockImplementation();
jest.spyOn(console, "error").mockImplementation();

describe("createMatchupsResponse function", () => {
  const currentWeek = 1;
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
            totalProjectedPointsLive: 123.1234,
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
            totalProjectedPointsLive: 123.1234,
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
          matchupPeriodId: currentWeek,
        },
        {
          home: {
            teamId: 3,
            totalPoints: 0,
            totalPointsLive: 0,
            totalProjectedPointsLive: 123.1234,
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
            totalProjectedPointsLive: 123.1234,
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
          matchupPeriodId: currentWeek,
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

  it("should send correct post object and log successful post with message", async () => {
    const matchupStringsArray = [
      "test entry 2 (1-0, 2nd) vs test entry (1-0, 1st)\nProjected Score: TST2 123.1 - 123.1 TST",
      "test entry 4 (1-0, 4th) vs test entry 3 (1-0, 3rd)\nProjected Score: TST4 123.1 - 123.1 TST3",
    ];
    const expectedMessageString =
      "This Week's Matchups" + "\n\n" + matchupStringsArray.join("\n\n");
    const mockAxiosUrl = `${BASE_GROUPME_ENDPOINT}/bots/post`;
    const mockAxiosData = {
      bot_id: process.env.BOT_ID,
      text: expectedMessageString,
    };

    axios.get.mockResolvedValueOnce(expectedAxiosResponse);
    axios.post.mockResolvedValueOnce({ status: 200 });
    await handleMatchupsResponse(currentWeek);

    expect(axios.post).toBeCalledWith(mockAxiosUrl, mockAxiosData);
    expect(consoleInfoSpyOn).toBeCalledWith(
      "Message successfully posted:",
      expectedMessageString
    );
  });

  it("should throw error with message", async () => {
    const expectedError = new Error("Error posting matchups.");
    await expect(handleMatchupsResponse()).rejects.toEqual(expectedError);
  });
});
