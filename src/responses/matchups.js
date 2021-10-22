const _ = require("lodash");
const { getBoxscores } = require("../data/getBoxscores");
const { postMessage } = require("../utils/postMessage");
const addOrdinal = require("../utils/addOrdinal");

const createMatchupStringsArray = (boxscores) =>
  _.map(
    boxscores,
    ({ homeTeam, awayTeam }) =>
      `${awayTeam.name} (${awayTeam.record.wins}-${
        awayTeam.record.losses
      }, ${addOrdinal(awayTeam.playoffSeed)}) vs ${homeTeam.name} (${
        homeTeam.record.wins
      }-${homeTeam.record.losses}, ${addOrdinal(homeTeam.playoffSeed)})` +
      "\n" +
      `Projected Score: ${awayTeam.abbrev} ${awayTeam.totalProjectedPointsLive} - ${homeTeam.totalProjectedPointsLive} ${homeTeam.abbrev}`
  );

const createMatchupsResponse = async (week) => {
  const title = "This Week's Matchups";
  const boxscores = await getBoxscores(week);
  const matchups = createMatchupStringsArray(boxscores);
  return title + "\n\n" + matchups.join("\n\n");
};

const handleMatchupsResponse = async (week) => {
  try {
    const message = await createMatchupsResponse(week);
    return postMessage(message);
  } catch (error) {
    console.error("Error posting matchups:\n", error);
    throw Error("Error posting matchups.");
  }
};

module.exports = handleMatchupsResponse;
