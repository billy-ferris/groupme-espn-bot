const addOrdinal = require("./addOrdinal");

describe("addOrdinal function", () => {
  it("should return 1st", async () => {
    expect(addOrdinal(1)).toEqual("1st");
  });

  it("should return 23rd", async () => {
    expect(addOrdinal(23)).toEqual("23rd");
  });

  it("should return 11th", async () => {
    expect(addOrdinal(11)).toEqual("11th");
  });

  it("should return 2nd", async () => {
    expect(addOrdinal(2)).toEqual("2nd");
  });

  it("should throw an error if called without an argument", async () => {
    const expectedErrorMessage = "You must provide a number.";
    expect(() => addOrdinal()).toThrowError(expectedErrorMessage);
  });

  it("should throw an error if called without a number", async () => {
    const expectedErrorMessage = "You must provide a number.";
    expect(() => addOrdinal()).toThrowError(expectedErrorMessage);
  });
});
