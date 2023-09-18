"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMatchups = void 0;
const helpers_1 = require("./helpers");
const postMatchups = async (scoringPeriod) => {
    try {
        const message = await (0, helpers_1.createMatchupsMessage)(scoringPeriod);
        await (0, helpers_1.postMessage)(message);
    }
    catch (error) {
        console.error("Error posting matchups:\n", error);
        throw Error("Error posting matchups. See console for details.");
    }
};
exports.postMatchups = postMatchups;
