import axios from "axios";
import { ESPN_FFL_ENDPOINT } from "../consts";
import { LeagueEndpointData } from "../types";

const seasonId = Number(process.env.SEASON_ID);
const { LEAGUE_ID, SWID, ESPN_S2 } = process.env;

const getLeagueEndpoint = async (
  params?: string
): Promise<LeagueEndpointData> => {
  let apiUrl = `${ESPN_FFL_ENDPOINT}/seasons/${seasonId}/segments/0/leagues/${LEAGUE_ID}`;
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

export default getLeagueEndpoint;
