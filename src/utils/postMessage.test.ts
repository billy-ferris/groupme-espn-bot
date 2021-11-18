import axios from "axios";
import postMessage from "./postMessage";
import { BASE_GROUPME_ENDPOINT } from "../consts";

jest.mock("axios");

const consoleInfoSpyOn = jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

describe("postMessage function", () => {
  let mockAxios: jest.Mocked<typeof axios>;
  let mockAxiosUrl: string;
  let mockAxiosData: Record<string, any>;

  beforeAll(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  beforeEach(() => {
    mockAxiosUrl = `${BASE_GROUPME_ENDPOINT}/bots/post`;
    mockAxiosData = {
      bot_id: process.env.BOT_ID,
      text: "test post message",
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should call axios and log info to console when data is valid", async () => {
    mockAxios.post.mockResolvedValueOnce({});

    await postMessage(mockAxiosData.text);

    await expect(mockAxios.post).toBeCalledWith(mockAxiosUrl, mockAxiosData);
    expect(consoleInfoSpyOn).toBeCalledTimes(1);
  });

  test("should call axios and log error to console when request fails", async () => {
    mockAxios.post.mockRejectedValueOnce(new Error());

    await postMessage(mockAxiosData.text);

    await expect(mockAxios.post).toBeCalledWith(mockAxiosUrl, mockAxiosData);
    expect(consoleErrorSpyOn).toBeCalledTimes(1);
  });
});
