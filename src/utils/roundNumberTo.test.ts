import roundNumberTo from "./roundNumberTo";

describe("roundNumberTo function", () => {
  test.each([
    { numberToRound: 1.123, placesToRound: 1, roundedNumber: 1.1 },
    { numberToRound: -1.127, placesToRound: 2, roundedNumber: -1.13 },
    { numberToRound: 0.12, placesToRound: 4, roundedNumber: 0.12 },
    { numberToRound: 1.27, placesToRound: 1, roundedNumber: 1.3 },
    { numberToRound: 1.2, placesToRound: 2, roundedNumber: 1.2 },
  ])(
    "should round $numberToRound to $roundedNumber",
    ({ numberToRound, placesToRound, roundedNumber }) => {
      expect(roundNumberTo(numberToRound, placesToRound)).toEqual(
        roundedNumber
      );
    }
  );

  it("should round to whole number if places argument is absent", () => {
    expect(roundNumberTo(1.634)).toEqual(2);
  });
});
