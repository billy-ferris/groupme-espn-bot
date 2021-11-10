import _ from "lodash";
import getBoxscores from "../data/getBoxscores";
import postMessage from "../utils/postMessage";
import addOrdinal from "../utils/addOrdinal";

const createMatchupStringsArray = (boxscores: Record<any, any>) =>
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

const createMatchupsResponse = async (week?: number) => {
  const title = "This Week's Matchups";
  const boxscores = await getBoxscores(week);
  const matchups = createMatchupStringsArray(boxscores);
  return title + "\n\n" + matchups.join("\n\n");
};

const handleMatchupsResponse = async (week?: number) => {
  try {
    const message = await createMatchupsResponse(week);
    await postMessage(message);
  } catch (error) {
    console.error("Error posting matchups:\n", error);
    throw Error("Error posting matchups.");
  }
};

export default handleMatchupsResponse;
