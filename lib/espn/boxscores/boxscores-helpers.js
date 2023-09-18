"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoxscoresResult = exports.createBoxscore = exports.createBoxscoreTeam = exports.createBoxscorePlayer = exports.roundNumber = void 0;
const consts_1 = require("./consts");
const roundNumber = (number, places = 0) => {
    const multiplier = Math.pow(10, places);
    return Number((Math.round(number * multiplier) / multiplier).toFixed(2));
};
exports.roundNumber = roundNumber;
const createBoxscorePlayer = ({ lineupSlotId, playerPoolEntry: { appliedStatTotal, player: { id, firstName, lastName, proTeamId, eligibleSlots }, }, }) => ({
    id,
    firstName,
    lastName,
    teamName: consts_1.nflTeamIdToNFLTeam[proTeamId],
    teamAbbrev: consts_1.nflTeamIdToNFLTeamAbbreviation[proTeamId],
    lineupSlot: consts_1.slotCategoryIdToPositionMap[lineupSlotId],
    eligibleSlots: eligibleSlots.map((slotId) => consts_1.slotCategoryIdToPositionMap[slotId]),
    totalPoints: (0, exports.roundNumber)(appliedStatTotal, 1),
});
exports.createBoxscorePlayer = createBoxscorePlayer;
const getTeamById = (teams, teamId) => {
    const team = teams.find((team) => team.id === teamId);
    if (!team) {
        throw Error("Failed to get team by ID.");
    }
    return team;
};
const createBoxscoreTeam = ({ teamId, totalPoints, totalPointsLive, totalProjectedPointsLive, rosterForCurrentScoringPeriod, }, teams) => {
    const { playoffSeed, name, record, abbrev } = getTeamById(teams, teamId);
    return {
        id: teamId,
        name,
        abbrev,
        playoffSeed,
        record: record.overall,
        totalPoints: (0, exports.roundNumber)(totalPoints, 1),
        totalPointsLive: (0, exports.roundNumber)(totalPointsLive, 1),
        totalProjectedPointsLive: (0, exports.roundNumber)(totalProjectedPointsLive, 1),
        roster: rosterForCurrentScoringPeriod.entries.map(exports.createBoxscorePlayer),
    };
};
exports.createBoxscoreTeam = createBoxscoreTeam;
const createBoxscore = ({ home, away }, teams) => ({
    homeTeam: (0, exports.createBoxscoreTeam)(home, teams),
    awayTeam: (0, exports.createBoxscoreTeam)(away, teams),
});
exports.createBoxscore = createBoxscore;
const getBoxscoresResult = ({ teams, schedule, scoringPeriod, }) => {
    const matchups = schedule.filter(({ matchupPeriodId }) => matchupPeriodId === scoringPeriod);
    return matchups.map((matchup) => (0, exports.createBoxscore)(matchup, teams));
};
exports.getBoxscoresResult = getBoxscoresResult;
