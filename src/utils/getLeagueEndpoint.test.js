const axios = require("axios");
const { ESPN_FFL_ENDPOINT } = require("../consts");
const { getLeagueEndpoint } = require("./getLeagueEndpoint");

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

describe("league helper", () => {
  let baseUrl;
  let mockAxiosConfig;
  let mockAxiosResponse;
  let scoringPeriod;

  beforeEach(() => {
    scoringPeriod = 4;
    baseUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
    mockAxiosConfig = {
      headers: {
        Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
      },
    };
    mockAxiosResponse = {
      data: {
        gameId: 1,
        id: 56951748,
        members: [],
        scoringPeriodId: scoringPeriod,
        seasonId: 2021,
        segmentId: 0,
        settings: { name: "Testing league endpoint" },
        status: {
          currentMatchupPeriod: scoringPeriod,
          isActive: true,
          latestScoringPeriod: scoringPeriod,
        },
        teams: [],
      },
    };
  });

  describe("fetchLeagueEndpoint function", () => {
    test("should call axios and return base league endpoint", async () => {
      axios.get.mockResolvedValueOnce(mockAxiosResponse);

      await expect(getLeagueEndpoint()).resolves.toEqual(
        mockAxiosResponse.data
      );

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
    });

    test("should call axios and return league endpoint with passed parameters", async () => {
      const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
      const expectedUrl = `${baseUrl}${urlParams}`;
      axios.get.mockResolvedValueOnce(mockAxiosResponse);

      await expect(getLeagueEndpoint(urlParams)).resolves.toEqual(
        mockAxiosResponse.data
      );

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, mockAxiosConfig);
    });

    test("should call axios and log and throw an error on failure", async () => {
      const expectedError = new Error("Error fetching league endpoint.");
      axios.get.mockRejectedValueOnce(expectedError);

      await expect(getLeagueEndpoint()).rejects.toEqual(expectedError);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
      expect(consoleErrorSpyOn).toBeCalledTimes(1);
    });
  });
});
