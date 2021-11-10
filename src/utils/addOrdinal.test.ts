import addOrdinal from "./addOrdinal";

describe("addOrdinal function", () => {
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
