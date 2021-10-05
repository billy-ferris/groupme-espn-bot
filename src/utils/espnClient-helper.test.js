const {
  fetchLeagueEndpoint,
  getCurrentWeek,
  getTeams,
  getTeamById,
  getBoxscores,
} = require("./espnClient-helper");
const axios = require("axios");
const { espnClient } = require("../espnClient");
const { ESPN_FFL_ENDPOINT } = require("./consts");

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const getTeamsAtWeekSpyOn = jest.spyOn(espnClient, "getTeamsAtWeek");
const getBoxscoreForWeekSpyOn = jest.spyOn(espnClient, "getBoxscoreForWeek");

const consoleInfoSpyOn = jest.spyOn(console, "info");
const consoleErrorSpyOn = jest.spyOn(console, "error");

describe("espnClient helper", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchLeagueEndpoint function", () => {
    it("should call axios and return league data", async () => {
      const apiUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
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
      expect(axios.get).toHaveBeenCalledWith(apiUrl, mockAxiosConfig);
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

  describe("getTeams function", () => {
    it("should return the teams from the week provided", async () => {
      const week = 4;
      const expectedTeamsResponse = [
        {
          id: 1,
          abbreviation: "UNDR",
          name: "The Underachievers",
        },
        {
          id: 2,
          abbreviation: "VVV",
          name: "Vince's Valiant Vegetables",
        },
        {
          id: 3,
          abbreviation: "LOBI",
          name: "Fantasy Blues",
        },
      ];
      getTeamsAtWeekSpyOn.mockResolvedValueOnce(expectedTeamsResponse);

      await expect(getTeams(week)).resolves.toEqual(expectedTeamsResponse);

      expect(getTeamsAtWeekSpyOn).toBeCalledTimes(1);
      expect(getTeamsAtWeekSpyOn).toBeCalledWith({
        scoringPeriodId: week,
        seasonId,
      });
    });

    it("should return the teams from the current week if no week is provided", async () => {
      const currentWeek = 4;
      const expectedTeamsResponse = [
        {
          id: 1,
          abbreviation: "UNDR",
          name: "The Underachievers",
        },
        {
          id: 2,
          abbreviation: "VVV",
          name: "Vince's Valiant Vegetables",
        },
        {
          id: 3,
          abbreviation: "LOBI",
          name: "Fantasy Blues",
        },
      ];
      getTeamsAtWeekSpyOn.mockResolvedValueOnce(expectedTeamsResponse);
      axios.get.mockResolvedValueOnce({
        data: {
          scoringPeriodId: currentWeek,
        },
      });

      await expect(getTeams()).resolves.toEqual(expectedTeamsResponse);

      expect(getTeamsAtWeekSpyOn).toBeCalledTimes(1);
      expect(getTeamsAtWeekSpyOn).toBeCalledWith({
        scoringPeriodId: currentWeek,
        seasonId,
      });
    });

    it("should log and throw an error on failure", async () => {
      const week = 4;
      const expectedError = new Error("Error fetching teams.");
      getTeamsAtWeekSpyOn.mockRejectedValueOnce(expectedError);

      await expect(getTeams(week)).rejects.toEqual(expectedError);

      expect(getTeamsAtWeekSpyOn).toBeCalledTimes(1);
      expect(consoleErrorSpyOn).toBeCalledTimes(1);
    });
  });

  describe("getTeamById function", () => {
    it("should return team object with corresponding ID", () => {
      const teamIdToGet = 1;
      const testTeamsResponse = [
        {
          id: 1,
          abbreviation: "UNDR",
          name: "The Underachievers",
        },
        {
          id: 2,
          abbreviation: "VVV",
          name: "Vince's Valiant Vegetables",
        },
        {
          id: 3,
          abbreviation: "LOBI",
          name: "Fantasy Blues",
        },
      ];
      const expectedResult = {
        id: 1,
        abbreviation: "UNDR",
        name: "The Underachievers",
      };

      const result = getTeamById(teamIdToGet, testTeamsResponse);

      expect(result).toEqual(expectedResult);
    });

    it("should throw an error when teams array is missing", () => {
      const teamIdToGet = 1;
      const expectedErrorMessage = "teams is required.";

      expect(() => getTeamById(teamIdToGet)).toThrowError(expectedErrorMessage);
    });
  });

  describe("getBoxscores function", () => {
    // TODO: rework tests for more coverage inside promise logic
    it("should return boxscores from the week provided", async () => {
      const week = 4;
      const expectedBoxscoreResponse = [
        {
          homeScore: 0,
          homeTeamId: 1,
          homeRoster: [],
          awayScore: 0,
          awayTeamId: 2,
          awayRoster: [],
        },
      ];
      const testTeamsResponse = [
        {
          id: 1,
          abbreviation: "UNDR",
          name: "The Underachievers",
        },
        {
          id: 2,
          abbreviation: "VVV",
          name: "Vince's Valiant Vegetables",
        },
        {
          id: 3,
          abbreviation: "LOBI",
          name: "Fantasy Blues",
        },
      ];
      axios.get.mockResolvedValueOnce({
        data: {
          scoringPeriodId: week,
        },
      });
      getTeamsAtWeekSpyOn.mockResolvedValueOnce(testTeamsResponse);
      getBoxscoreForWeekSpyOn.mockResolvedValueOnce(expectedBoxscoreResponse);

      await expect(getBoxscores(week)).resolves.toEqual(
        expectedBoxscoreResponse
      );

      expect(getTeamsAtWeekSpyOn).toBeCalledTimes(1);
      expect(getBoxscoreForWeekSpyOn).toBeCalledTimes(1);
    });

    it("should log and throw an error on failure", async () => {
      const week = 4;
      const expectedError = new Error("Error fetching boxscores.");
      getBoxscoreForWeekSpyOn.mockRejectedValueOnce(expectedError);

      await expect(getBoxscores(week)).rejects.toEqual(expectedError);

      expect(getBoxscoreForWeekSpyOn).toBeCalledTimes(1);
      expect(consoleErrorSpyOn).toBeCalledTimes(1);
    });
  });
});
