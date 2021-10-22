const { getBoxscores } = require("../data/getBoxscores");
const { postMessage } = require("../utils/postMessage");
const { createMatchupStringsArray } = require("./helpers/matchupsHelper");

const createMatchupsResponse = async (week) => {
  try {
    const title = "This Week's Matchups";
    const boxscores = await getBoxscores(week);
    const matchups = createMatchupStringsArray(boxscores);
    const message = title + "\n\n" + matchups.join("\n\n");
    // TODO: extract posting of message to another file
    await postMessage(message);
  } catch (error) {
    console.error("Error posting matchups:\n", error);
    throw Error("Error posting matchups.");
  }
};

module.exports = {
  createMatchupsResponse,
};
