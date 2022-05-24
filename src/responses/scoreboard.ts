import postMessage from "../utils/postMessage";
import getScoreboard from "../data/getScoreboard";
import getProjectedScoreboard from "../data/getProjectedScoreboard";

const createScoreboardResponse = async (week?: number): Promise<string> => {
  const liveScoreboard = await getScoreboard(week);
  const projScoreboard = await getProjectedScoreboard(week);
  return liveScoreboard + "\n\n" + projScoreboard;
};

const handleScoreboardResponse = async (week?: number): Promise<void> => {
  try {
    const message = await createScoreboardResponse(week);
    await postMessage(message);
  } catch (error) {
    console.error("Error posting scoreboards:\n", error);
    throw Error("Error posting scoreboards.");
  }
};

export default handleScoreboardResponse;
