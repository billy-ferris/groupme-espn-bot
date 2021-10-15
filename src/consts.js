const ESPN_FFL_ENDPOINT = "https://fantasy.espn.com/apis/v3/games/ffl";
const BASE_GROUPME_ENDPOINT = "https://api.groupme.com/v3";

const slotCategoryIdToPositionMap = Object.freeze({
  0: "QB",
  1: "TQB",
  2: "RB",
  3: "RB/WR",
  4: "WR",
  5: "WR/TE",
  6: "TE",
  7: "OP",
  8: "DT",
  9: "DE",
  10: "LB",
  11: "DL",
  12: "CB",
  13: "S",
  14: "DB",
  15: "DP",
  16: "D/ST",
  17: "K",
  18: "P",
  19: "HC",
  20: "Bench",
  21: "IR",
  22: "Unknown",
  23: "RB/WR/TE",
  24: "Unknown",
});

const nflTeamIdToNFLTeam = Object.freeze({
  [-1]: "Bye",
  1: "Atlanta Falcons",
  2: "Buffalo Bills",
  3: "Chicago Bears",
  4: "Cincinnati Bengals",
  5: "Cleveland Browns",
  6: "Dallas Cowboys",
  7: "Denver Broncos",
  8: "Detroit Lions",
  9: "Green Bay Packers",
  10: "Tennessee Titans",
  11: "Indianapolis Colts",
  12: "Kansas City Chiefs",
  13: "Oakland Raiders",
  14: "Los Angeles Rams",
  15: "Miami Dolphins",
  16: "Minnesota Vikings",
  17: "New England Patriots",
  18: "New Orleans Saints",
  19: "New York Giants",
  20: "New York Jets",
  21: "Philadelphia Eagles",
  22: "Arizona Cardinals",
  23: "Pittsburgh Steelers",
  24: "Los Angeles Chargers",
  25: "San Francisco 49ers",
  26: "Seattle Seahawks",
  27: "Tampa Bay Buccaneers",
  28: "Washington Redskins",
  29: "Carolina Panthers",
  30: "Jacksonville Jaguars",
  33: "Baltimore Ravens",
  34: "Houston Texans",
});

const nflTeamIdToNFLTeamAbbreviation = Object.freeze({
  [-1]: "Bye",
  1: "ATL",
  2: "BUF",
  3: "CHI",
  4: "CIN",
  5: "CLE",
  6: "DAL",
  7: "DEN",
  8: "DET",
  9: "GB",
  10: "TEN",
  11: "IND",
  12: "KC",
  13: "OAK",
  14: "LAR",
  15: "MIA",
  16: "MIN",
  17: "NE",
  18: "NO",
  19: "NYG",
  20: "NYJ",
  21: "PHI",
  22: "ARI",
  23: "PIT",
  24: "LAC",
  25: "SF",
  26: "SEA",
  27: "TB",
  28: "WSH",
  29: "CAR",
  30: "JAX",
  33: "BAL",
  34: "HOU",
});

module.exports = {
  ESPN_FFL_ENDPOINT,
  BASE_GROUPME_ENDPOINT,
  slotCategoryIdToPositionMap,
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
};
