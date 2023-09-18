"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.createMatchupsMessage = exports.addOrdinal = exports.addHeatScale = void 0;
const axios_1 = __importDefault(require("axios"));
const consts_1 = require("./consts");
const espn_1 = require("../espn");
const addHeatScale = (streakType, streakLength) => {
    let streakString = "";
    switch (streakType) {
        case "WIN":
            if (streakLength > 1 && streakLength < 3) {
                streakString = "🔥";
            }
            else if (streakLength >= 3 && streakLength < 5) {
                streakString = "🔥🔥";
            }
            else if (streakLength >= 5) {
                streakString = "🔥🔥🔥";
            }
            break;
        case "LOSS":
            if (streakLength > 1 && streakLength < 3) {
                streakString = "❄️";
            }
            else if (streakLength >= 3 && streakLength < 5) {
                streakString = "❄️❄️";
            }
            else if (streakLength >= 5) {
                streakString = "❄️❄️❄️";
            }
            break;
    }
    return streakString;
};
exports.addHeatScale = addHeatScale;
const addOrdinal = (number) => {
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
exports.addOrdinal = addOrdinal;
const createMatchupTeamString = (team) => `${team.name} (${team.record.wins}-${team.record.losses}, ${(0, exports.addOrdinal)(team.playoffSeed)})`;
const createMatchupString = ({ awayTeam, homeTeam, }) => `${createMatchupTeamString(awayTeam)} vs ${createMatchupTeamString(homeTeam)}` +
    "\n" +
    `Projected Score: ${awayTeam.abbrev} ${awayTeam.totalProjectedPointsLive} - ${homeTeam.totalProjectedPointsLive} ${homeTeam.abbrev}`;
const getMatchups = async (scoringPeriod) => {
    try {
        const boxscores = await (0, espn_1.getBoxscores)(scoringPeriod);
        return boxscores.map(({ homeTeam, awayTeam }) => createMatchupString({ awayTeam, homeTeam }));
    }
    catch (error) {
        console.error("Error fetching matchups:\n", error);
        throw new Error("Error fetching matchups. See console for details.");
    }
};
const createMatchupsMessage = async (scoringPeriod) => {
    try {
        const matchups = await getMatchups(scoringPeriod);
        return `This Week's Matchups\n\n${matchups.join("\n\n")}`;
    }
    catch (error) {
        console.error("Error creating matchups message:\n", error);
        throw new Error("Error creating matchups message. See console for details.");
    }
};
exports.createMatchupsMessage = createMatchupsMessage;
const postMessage = async (message) => {
    const url = `${consts_1.BASE_GROUPME_ENDPOINT}/bots/post`;
    const data = {
        bot_id: consts_1.GROUPME_BOT_ID,
        text: message,
    };
    await axios_1.default
        .post(url, data)
        .then(() => console.info("Message successfully posted:", data.text))
        .catch((error) => console.error("Error posting message:", error.message));
};
exports.postMessage = postMessage;
