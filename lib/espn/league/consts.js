"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEASON_ID = exports.ESPN_S2 = exports.SWID = exports.LEAGUE_ID = exports.ESPN_FFL_ENDPOINT = void 0;
exports.ESPN_FFL_ENDPOINT = "https://fantasy.espn.com/apis/v3/games/ffl";
_a = process.env, exports.LEAGUE_ID = _a.LEAGUE_ID, exports.SWID = _a.SWID, exports.ESPN_S2 = _a.ESPN_S2;
exports.SEASON_ID = Number(process.env.SEASON_ID);
