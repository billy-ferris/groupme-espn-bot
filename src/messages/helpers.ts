import axios from "axios";
import { BASE_GROUPME_ENDPOINT, GROUPME_BOT_ID } from "./consts";
import { BoxscoreTeam, getBoxscores } from "../espn";

export const addHeatScale = (
  streakType: string,
  streakLength: number
): string => {
  let streakString = "";
  switch (streakType) {
    case "WIN":
      if (streakLength > 1 && streakLength < 3) {
        streakString = "🔥";
      } else if (streakLength >= 3 && streakLength < 5) {
        streakString = "🔥🔥";
      } else if (streakLength >= 5) {
        streakString = "🔥🔥🔥";
      }
      break;
    case "LOSS":
      if (streakLength > 1 && streakLength < 3) {
        streakString = "❄️";
      } else if (streakLength >= 3 && streakLength < 5) {
        streakString = "❄️❄️";
      } else if (streakLength >= 5) {
        streakString = "❄️❄️❄️";
      }
      break;
  }
  return streakString;
};

export const addOrdinal = (number: number): string => {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return number + "st";
  }
  if (lastDigit === 2 && lastTwoDigits !== 12) {
    return number + "nd";
  }
  if (lastDigit === 3 && lastTwoDigits !== 13) {
    return number + "rd";
  }
  return number + "th";
};

const createMatchupTeamString = (team: BoxscoreTeam) =>
  `${team.name} (${team.record.wins}-${team.record.losses}, ${addOrdinal(
    team.playoffSeed
  )})`;

const createMatchupString = ({
  awayTeam,
  homeTeam,
}: {
  awayTeam: BoxscoreTeam;
  homeTeam: BoxscoreTeam;
}) =>
  `${createMatchupTeamString(awayTeam)} vs ${createMatchupTeamString(
    homeTeam
  )}` +
  "\n" +
  `Projected Score: ${awayTeam.abbrev} ${awayTeam.totalProjectedPointsLive} - ${homeTeam.totalProjectedPointsLive} ${homeTeam.abbrev}`;

const getMatchups = async (scoringPeriod?: number): Promise<string[]> => {
  const boxscores = await getBoxscores(scoringPeriod);
  return boxscores.map(({ homeTeam, awayTeam }) =>
    createMatchupString({ awayTeam, homeTeam })
  );
};

export const createMatchupsMessage = async (
  scoringPeriod?: number
): Promise<string> => {
  const matchups = await getMatchups(scoringPeriod);
  return "This Week's Matchups" + "\n\n" + matchups.join("\n\n");
};

export const postMessage = async (message: string): Promise<void> => {
  const url = `${BASE_GROUPME_ENDPOINT}/bots/post`;
  const data = {
    bot_id: GROUPME_BOT_ID,
    text: message,
  };
  await axios
    .post(url, data)
    .then(() => console.info("Message successfully posted:", data.text))
    .catch((error) => console.error("Error posting message:", error.message));
};
