const { Client } = require("espn-fantasy-football-api/node-dev");

const { LEAGUE_ID, ESPN_S2, SWID } = process.env;

const espnClient = new Client({ leagueId: LEAGUE_ID });
espnClient.setCookies({ espnS2: ESPN_S2, SWID });

module.exports = { espnClient };
