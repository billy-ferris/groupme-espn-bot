import { createMatchupsMessage, postMessage } from "./helpers";

export const postMatchups = async (scoringPeriod?: number): Promise<void> => {
  try {
    const message = await createMatchupsMessage(scoringPeriod);
    await postMessage(message);
  } catch (error) {
    console.error("Error posting matchups:\n", error);
    throw Error("Error posting matchups.");
  }
};
