import axios, { AxiosResponse } from "axios";
import { getCurrentWeek } from "./get-current-week";

jest.mock("axios");

jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

const scoringPeriod = 1;
const mockAxiosResponse: AxiosResponse = {
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

describe("getCurrentWeek", () => {
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
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
