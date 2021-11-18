import axios, { AxiosResponse } from "axios";
import getCurrentWeek from "./getCurrentWeek";

jest.mock("axios");

jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

describe("getCurrentWeek function", () => {
  let scoringPeriod: number;
  let mockAxios: jest.Mocked<typeof axios>;
  let mockAxiosResponse: AxiosResponse;

  beforeAll(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  beforeEach(() => {
    scoringPeriod = 4;
    mockAxiosResponse = {
      config: {},
      headers: {},
      status: 200,
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

  test("should return the current week", async () => {
    mockAxios.get.mockResolvedValueOnce(mockAxiosResponse);
    await expect(getCurrentWeek()).resolves.toEqual(scoringPeriod);
  });

  test("should log and throw an error on failure", async () => {
    const expectedError = new Error("Error fetching current week.");

    await expect(getCurrentWeek()).rejects.toEqual(expectedError);
    expect(consoleErrorSpyOn).toBeCalledTimes(1);
  });
});
