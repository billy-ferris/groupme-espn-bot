const addHeatScale = require("./addHeatScale");

describe("addHeatScale function", () => {
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
