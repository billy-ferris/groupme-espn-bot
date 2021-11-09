const addOrdinal = require("./addOrdinal");

describe("addOrdinal function", () => {
  test.each([
    { number: 1, numberWithOrdinal: "1st" },
    { number: 23, numberWithOrdinal: "23rd" },
    { number: 11, numberWithOrdinal: "11th" },
    { number: 2, numberWithOrdinal: "2nd" },
  ])(
    "should return $number as $numberWithOrdinal",
    ({ number, numberWithOrdinal }) => {
      expect(addOrdinal(number)).toEqual(numberWithOrdinal);
    }
  );

  test("should throw an error if called without an argument", async () => {
    const expectedErrorMessage = "You must provide a number.";
    expect(() => addOrdinal()).toThrowError(expectedErrorMessage);
  });

  test("should throw an error if called without a number", async () => {
    const expectedErrorMessage = "You must provide a number.";
    expect(() => addOrdinal()).toThrowError(expectedErrorMessage);
  });
});
