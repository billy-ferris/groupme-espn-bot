import { Boxscore } from "./types";
/**
 * Retrieves boxscores for a specific scoring period or the current week if none is provided.
 * @param {number} [scoringPeriod] - The scoring period for which to retrieve boxscores.
 * @returns {Promise<Boxscore[]>} - Array of boxscores.
 * @throws {Error} - Throws an error if there is an issue fetching boxscores.
 */
export declare const getBoxscores: (scoringPeriod?: number) => Promise<Boxscore[]>;
