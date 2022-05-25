import axios from "axios";
import {
  ESPN_FFL_ENDPOINT,
  ESPN_S2,
  LEAGUE_ID,
  SEASON_ID,
  SWID,
} from "./consts";
import { LeagueInfo } from "./types";

export const getLeagueInfo = async (params?: string): Promise<LeagueInfo> => {
  let apiUrl = `${ESPN_FFL_ENDPOINT}/seasons/${SEASON_ID}/segments/0/leagues/${LEAGUE_ID}`;
  if (params) {
    apiUrl += params;
  }

  return axios
    .get(apiUrl, {
      headers: {
        Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching league endpoint:\n", error);
      throw Error("Error fetching league endpoint.");
    });
};
