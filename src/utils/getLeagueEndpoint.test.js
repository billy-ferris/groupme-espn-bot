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
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchLeagueEndpoint function", () => {
    it("should call axios and return base league endpoint", async () => {
      const baseUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
      const mockAxiosConfig = {
        headers: {
          Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
        },
      };
      const expectedAxiosResponse = {
        data: {
          gameId: 1,
          id: 56951748,
          members: [],
          scoringPeriodId: 4,
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

      await expect(getLeagueEndpoint()).resolves.toEqual(
        expectedAxiosResponse.data
      );

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
    });

    it("should call axios and return league endpoint with passed parameters", async () => {
      const scoringPeriod = 4;
      const baseUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
      const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
      const expectedUrl = `${baseUrl}${urlParams}`;
      const mockAxiosConfig = {
        headers: {
          Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
        },
      };
      const expectedAxiosResponse = {
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
      axios.get.mockResolvedValueOnce(expectedAxiosResponse);

      await expect(getLeagueEndpoint(urlParams)).resolves.toEqual(
        expectedAxiosResponse.data
      );

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, mockAxiosConfig);
    });

    it("should call axios and log and throw an error on failure", async () => {
      const apiUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
      const mockAxiosConfig = {
        headers: {
          Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
        },
      };
      const expectedError = new Error("Error fetching league endpoint.");
      axios.get.mockRejectedValueOnce(expectedError);

      await expect(getLeagueEndpoint()).rejects.toEqual(expectedError);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(apiUrl, mockAxiosConfig);
      expect(consoleErrorSpyOn).toBeCalledTimes(1);
    });
  });
});
