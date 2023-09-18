"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeagueInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const consts_1 = require("./consts");
const getLeagueInfo = async (params) => {
    let apiUrl = `${consts_1.ESPN_FFL_ENDPOINT}/seasons/${consts_1.SEASON_ID}/segments/0/leagues/${consts_1.LEAGUE_ID}`;
    if (params) {
        apiUrl += params;
    }
    return axios_1.default
        .get(apiUrl, {
        headers: {
            Cookie: `SWID=${consts_1.SWID}; espn_s2=${consts_1.ESPN_S2}`,
        },
    })
        .then(({ data }) => {
        return data;
    })
        .catch((error) => {
        console.error("Error fetching league endpoint:\n", error);
        throw Error("Error fetching league endpoint.");
    });
};
exports.getLeagueInfo = getLeagueInfo;
