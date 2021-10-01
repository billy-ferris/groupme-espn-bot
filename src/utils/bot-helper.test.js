const { postMessage } = require("./espnClient-helper");

describe("postMessage function", () => {
  // TODO: mock axios function to test call

  it("should throw an error if input is not a string", async () => {
    const input = { message: "this should fail" };
    const expectedError = new Error("Message must be a string.");
    expect.assertions(1);
    return expect(postMessage(input)).rejects.toEqual(expectedError);
  });
});