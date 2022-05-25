import { addHeatScale, addOrdinal, postMessage } from "./helpers";
import axios from "axios";
import { BASE_GROUPME_ENDPOINT } from "./consts";

jest.mock("axios");

const consoleInfoSpyOn = jest.spyOn(console, "info").mockImplementation();
const consoleErrorSpyOn = jest.spyOn(console, "error").mockImplementation();

describe("messages helpers", () => {
  describe("addHeatScale", () => {
    test.each([
      [1, "WIN", ""],
      [2, "WIN", "🔥"],
      [3, "WIN", "🔥🔥"],
      [5, "WIN", "🔥🔥🔥"],
      [1, "LOSS", ""],
      [2, "LOSS", "❄️"],
      [3, "LOSS", "❄️❄️"],
      [5, "LOSS", "❄️❄️❄️"],
    ])("%i %s should return %s", (streakLength, streakType, expected) => {
      expect(addHeatScale(streakType, streakLength)).toEqual(expected);
    });
  });

  describe("addOrdinal", () => {
    test.each([
      { number: 1, numberWithOrdinal: "1st" },
      { number: 2363, numberWithOrdinal: "2363rd" },
      { number: 111, numberWithOrdinal: "111th" },
      { number: 22, numberWithOrdinal: "22nd" },
    ])(
      "should return $number as $numberWithOrdinal",
      ({ number, numberWithOrdinal }) => {
        expect(addOrdinal(number)).toEqual(numberWithOrdinal);
      }
    );
  });

  describe("postMessage", () => {
    let mockAxios: jest.Mocked<typeof axios>;
    let mockAxiosUrl: string;
    let mockAxiosData: Record<string, any>;

    beforeAll(() => {
      mockAxios = axios as jest.Mocked<typeof axios>;
    });

    beforeEach(() => {
      mockAxiosUrl = `${BASE_GROUPME_ENDPOINT}/bots/post`;
      mockAxiosData = {
        bot_id: process.env.GROUPME_BOT_ID,
        text: "test post message",
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test("should call axios and log info to console when espn is valid", async () => {
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
});
