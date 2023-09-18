"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoxscores = void 0;
const boxscores_helpers_1 = require("./boxscores-helpers");
const league_1 = require("../league");
/**
 * Retrieves boxscores for a specific scoring period or the current week if none is provided.
 * @param {number} [scoringPeriod] - The scoring period for which to retrieve boxscores.
 * @returns {Promise<Boxscore[]>} - Array of boxscores.
 * @throws {Error} - Throws an error if there is an issue fetching boxscores.
 */
const getBoxscores = async (scoringPeriod) => {
    if (!scoringPeriod) {
        scoringPeriod = await (0, league_1.getCurrentWeek)();
    }
    const urlParams = `?view=mMatchupScore&view=mScoreboard&view=mTeam&view=mRoster&scoringPeriodId=${scoringPeriod}`;
    try {
        const { teams, schedule } = await (0, league_1.getLeagueInfo)(urlParams);
        return (0, boxscores_helpers_1.getBoxscoresResult)({
            teams,
            schedule,
            scoringPeriod,
        });
    }
    catch (error) {
        console.error("Error fetching boxscores:\n", error);
        throw new Error("Error fetching boxscores. See console for details.");
    }
};
exports.getBoxscores = getBoxscores;
