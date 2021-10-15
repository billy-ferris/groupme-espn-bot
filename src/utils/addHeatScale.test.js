const addHeatScale = require("./addHeatScale");

describe("addHeatScale function", () => {
  it("should return empty string", async () => {
    expect(addHeatScale("WIN", 1)).toEqual("");
  });

  it("should return 1 heat emoji", async () => {
    expect(addHeatScale("WIN", 2)).toEqual("🔥");
  });

  it("should return 2 heat emojis", async () => {
    expect(addHeatScale("WIN", 3)).toEqual("🔥🔥");
  });

  it("should return 3 heat emojis", async () => {
    expect(addHeatScale("WIN", 5)).toEqual("🔥🔥🔥");
  });

  // eslint-disable-next-line jest/no-identical-title
  it("should return empty string", async () => {
    expect(addHeatScale("LOSS", 1)).toEqual("");
  });

  it("should return 1 cold emoji", async () => {
    expect(addHeatScale("LOSS", 2)).toEqual("❄️");
  });

  it("should return 2 cold emojis", async () => {
    expect(addHeatScale("LOSS", 3)).toEqual("❄️❄️");
  });

  it("should return 3 cold emojis", async () => {
    expect(addHeatScale("LOSS", 5)).toEqual("❄️❄️❄️");
  });
});
