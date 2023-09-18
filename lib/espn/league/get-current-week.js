"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentWeek = void 0;
const get_league_info_1 = require("./get-league-info");
const getCurrentWeek = async () => {
    try {
        const { scoringPeriodId } = await (0, get_league_info_1.getLeagueInfo)();
        console.info("Successfully got current week: ", scoringPeriodId);
        return scoringPeriodId;
    }
    catch (error) {
        console.error("Error fetching current week:\n", error);
        throw Error("Error fetching current week.");
    }
};
exports.getCurrentWeek = getCurrentWeek;
