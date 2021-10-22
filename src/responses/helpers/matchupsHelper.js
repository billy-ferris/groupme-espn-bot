const _ = require("lodash");
const addOrdinal = require("../../utils/addOrdinal");

const createMatchupStringsArray = (boxscores) =>
  _.map(
    boxscores,
    ({ homeTeam, awayTeam }) =>
      `${awayTeam.name} (${awayTeam.record.wins}-${
        awayTeam.record.losses
      }, ${addOrdinal(awayTeam.playoffSeed)}) vs ${homeTeam.name} (${
        homeTeam.record.wins
      }-${homeTeam.record.losses}, ${addOrdinal(homeTeam.playoffSeed)})`
  );

module.exports = {
  createMatchupStringsArray,
};
