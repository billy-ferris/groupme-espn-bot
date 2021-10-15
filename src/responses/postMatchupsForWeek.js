const _ = require("lodash");
const { getBoxscores } = require("../utils/boxscore-helper");
const { postMessage } = require("../utils/bot-helper");

const postMatchupsForWeek = async (week) => {
  try {
    const boxscores = await getBoxscores(week);
    const matchups = _.map(
      boxscores,
      ({ homeTeam, awayTeam }) =>
        `${awayTeam.name} (${awayTeam.record.wins}-${awayTeam.record.losses}-${awayTeam.record.ties})` +
        "\nvs\n" +
        `${homeTeam.name} (${homeTeam.record.wins}-${homeTeam.record.losses}-${homeTeam.record.ties})`
    );
    const message = matchups.join("\n\n");
    console.log(message);
    // postMessage(message);
  } catch (error) {
    console.error("Error posting matchups:\n", error);
    throw Error("Error posting matchups.");
  }
};

module.exports = {
  postMatchupsForWeek,
};
