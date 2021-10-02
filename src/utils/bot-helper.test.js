const { postMessage } = require("./bot-helper");
const axios = require("axios");
const { BASE_GROUPME_ENDPOINT } = require("./consts");

jest.mock("axios", () => {
  return {
    post: jest.fn(),
  };
});

const consoleInfoSpyOn = jest.spyOn(console, "info");
const consoleErrorSpyOn = jest.spyOn(console, "error");

describe("postMessage function", () => {
  it("should call axios and log info to console when data is valid", async () => {
    const mockAxiosUrl = `${BASE_GROUPME_ENDPOINT}/bots/post`;
    const mockAxiosData = {
      bot_id: process.env.BOT_ID,
      text: "test post message",
    };
    axios.post.mockResolvedValueOnce();
    await postMessage(mockAxiosData.text);
    expect(axios.post).toBeCalledWith(mockAxiosUrl, mockAxiosData);
    expect(consoleInfoSpyOn).toBeCalledTimes(1);
  });

  it("should call axios and log error to console when data is invalid", async () => {
    const mockAxiosUrl = `${BASE_GROUPME_ENDPOINT}/bots/post`;
    const mockAxiosData = {
      bot_id: process.env.BOT_ID,
      text: "test post message",
    };
    axios.post.mockRejectedValueOnce(new Error("Message must be a string."));
    await postMessage(mockAxiosData.text);
    expect(axios.post).toBeCalledWith(mockAxiosUrl, mockAxiosData);
    expect(consoleErrorSpyOn).toBeCalledTimes(1);
  });

  it("should throw an error if input is not a string", async () => {
    const input = { message: "this should fail" };
    const expectedError = new Error("Message must be a string.");
    expect.assertions(1);
    return expect(postMessage(input)).rejects.toEqual(expectedError);
  });
});
