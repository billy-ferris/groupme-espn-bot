const axios = require("axios");
const { getCurrentWeek } = require("./getCurrentWeek");

jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

describe("getCurrentWeek function", () => {
  it("should return the current week", async () => {
    const currentWeek = 4;
    const expectedAxiosResponse = {
      data: {
        gameId: 1,
        id: 56951748,
        members: [],
        scoringPeriodId: currentWeek,
        seasonId: 2021,
        segmentId: 0,
        settings: { name: "Testing league endpoint" },
        status: {
          currentMatchupPeriod: 4,
          isActive: true,
          latestScoringPeriod: 4,
        },
        teams: [],
      },
    };
    axios.get.mockResolvedValueOnce(expectedAxiosResponse);

    await expect(getCurrentWeek()).resolves.toEqual(currentWeek);
  });

  it("should log and throw an error on failure", async () => {
    const expectedError = new Error("Error fetching current week.");

    await expect(getCurrentWeek()).rejects.toEqual(expectedError);
    expect(consoleErrorSpyOn).toBeCalledTimes(1);
  });
});
