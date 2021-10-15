const _ = require("lodash");
const { getBoxscores } = require("../helpers/boxscoreHelper");
const addOrdinal = require("../utils/addOrdinal");
const { postMessage } = require("../helpers/botHelper");

function createMatchupStringsArray(boxscores) {
  return _.map(
    boxscores,
    ({ homeTeam, awayTeam }) =>
      `${awayTeam.name} (${awayTeam.record.wins}-${
        awayTeam.record.losses
      }, ${addOrdinal(awayTeam.playoffSeed)}) vs ${homeTeam.name} (${
        homeTeam.record.wins
      }-${homeTeam.record.losses}, ${addOrdinal(homeTeam.playoffSeed)})`
  );
}

const postMatchups = async (week) => {
  try {
    const boxscores = await getBoxscores(week);
    const matchups = createMatchupStringsArray(boxscores);
    const message = "This Week's Matchups\n\n" + matchups.join("\n\n");
    await postMessage(message);
  } catch (error) {
    console.error("Error posting matchups:\n", error);
    throw Error("Error posting matchups.");
  }
};

module.exports = {
  postMatchups,
  createMatchupStringsArray,
};
