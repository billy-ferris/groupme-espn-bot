const { fetchLeagueEndpoint, getCurrentWeek } = require("./league-helper");
const axios = require("axios");
const { ESPN_FFL_ENDPOINT } = require("../consts");

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const consoleInfoSpyOn = jest.spyOn(console, "info");
const consoleErrorSpyOn = jest.spyOn(console, "error");

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

      await expect(fetchLeagueEndpoint()).resolves.toEqual(
        expectedAxiosResponse.data
      );

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
      expect(consoleInfoSpyOn).toBeCalledTimes(1);
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

      await expect(fetchLeagueEndpoint(urlParams)).resolves.toEqual(
        expectedAxiosResponse.data
      );

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, mockAxiosConfig);
      expect(consoleInfoSpyOn).toBeCalledTimes(1);
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

      await expect(fetchLeagueEndpoint()).rejects.toEqual(expectedError);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(apiUrl, mockAxiosConfig);
      expect(consoleErrorSpyOn).toBeCalledTimes(1);
    });
  });

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
});
