import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import getLeagueEndpoint from "./getLeagueEndpoint";
import { ESPN_FFL_ENDPOINT } from "../consts";
import { LeagueEndpointData } from "../types";

interface LeagueEndpointResponse extends AxiosResponse {
  data: LeagueEndpointData;
}

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

jest.mock("axios");

jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

describe("fetchLeagueEndpoint function", () => {
  let baseUrl: string;
  let mockAxios: jest.Mocked<typeof axios>;
  let mockAxiosConfig: AxiosRequestConfig;
  let mockAxiosResponse: LeagueEndpointResponse;
  let scoringPeriod: number;

  beforeAll(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  beforeEach(() => {
    scoringPeriod = 4;
    baseUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
    mockAxiosConfig = {
      headers: {
        Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
      },
    };
    mockAxiosResponse = {
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
      },
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should call axios and return base league endpoint", async () => {
    mockAxios.get.mockResolvedValueOnce(mockAxiosResponse);

    await expect(getLeagueEndpoint()).resolves.toEqual(mockAxiosResponse.data);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
  });

  test("should call axios and return league endpoint with passed parameters", async () => {
    const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
    const expectedUrl = `${baseUrl}${urlParams}`;
    mockAxios.get.mockResolvedValueOnce(mockAxiosResponse);

    await expect(getLeagueEndpoint(urlParams)).resolves.toEqual(
      mockAxiosResponse.data
    );

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl, mockAxiosConfig);
  });

  test("should call axios and log and throw an error on failure", async () => {
    const expectedError = new Error("Error fetching league endpoint.");
    mockAxios.get.mockRejectedValueOnce(expectedError);

    await expect(getLeagueEndpoint()).rejects.toEqual(expectedError);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(baseUrl, mockAxiosConfig);
    expect(consoleErrorSpyOn).toBeCalledTimes(1);
  });
});
