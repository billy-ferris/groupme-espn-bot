const addHeatScale = (streakType, streakLength) => {
  switch (streakType) {
    case "WIN":
      if (streakLength > 1 && streakLength < 3) {
        return "🔥";
      } else if (streakLength >= 3 && streakLength < 5) {
        return "🔥🔥";
      } else if (streakLength >= 5) {
        return "🔥🔥🔥";
      }
      return "";
    case "LOSS":
      if (streakLength > 1 && streakLength < 3) {
        return "❄️";
      } else if (streakLength >= 3 && streakLength < 5) {
        return "❄️❄️";
      } else if (streakLength >= 5) {
        return "❄️❄️❄️";
      }
      return "";
  }
};

module.exports = addHeatScale;
