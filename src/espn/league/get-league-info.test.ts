import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ESPN_FFL_ENDPOINT } from "./consts";
import { LeagueInfo } from "./types";
import { getLeagueInfo } from "./get-league-info";

interface LeagueEndpointResponse extends AxiosResponse {
  data: LeagueInfo;
}

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

jest.mock("axios");
jest.spyOn(console, "info").mockImplementation();

const baseUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
const scoringPeriod = 1;
const mockAxiosConfig: AxiosRequestConfig = {
  headers: {
    Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
  },
};
const mockAxiosResponse: LeagueEndpointResponse = {
  config: mockAxiosConfig,
  headers: {},
  status: 0,
  statusText: "",
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
    schedule: [],
  },
};

describe("fetchLeagueEndpoint", () => {
  let mockAxios: jest.Mocked<typeof axios>;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockReset();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("should call axios and return base league endpoint", async () => {
    mockAxios.get.mockResolvedValueOnce(mockAxiosResponse);

    await expect(getLeagueInfo()).resolves.toEqual(mockAxiosResponse.data);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
  });

  test("should call axios and return league endpoint with passed parameters", async () => {
    const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
    const expectedUrl = `${baseUrl}${urlParams}`;
    mockAxios.get.mockResolvedValueOnce(mockAxiosResponse);

    await expect(getLeagueInfo(urlParams)).resolves.toEqual(
      mockAxiosResponse.data
    );

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl, mockAxiosConfig);
  });

  test("should call axios and log and throw an error on failure", async () => {
    const expectedError = new Error("Error fetching league endpoint.");
    mockAxios.get.mockRejectedValueOnce(expectedError);

    await expect(getLeagueInfo()).rejects.toEqual(expectedError);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });
});
