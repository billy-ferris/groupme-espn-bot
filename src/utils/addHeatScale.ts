const addHeatScale = (streakType: string, streakLength: number): string => {
  let streakString = "";
  switch (streakType) {
    case "WIN":
      if (streakLength > 1 && streakLength < 3) {
        streakString = "🔥";
      } else if (streakLength >= 3 && streakLength < 5) {
        streakString = "🔥🔥";
      } else if (streakLength >= 5) {
        streakString = "🔥🔥🔥";
      }
      break;
    case "LOSS":
      if (streakLength > 1 && streakLength < 3) {
        streakString = "❄️";
      } else if (streakLength >= 3 && streakLength < 5) {
        streakString = "❄️❄️";
      } else if (streakLength >= 5) {
        streakString = "❄️❄️❄️";
      }
      break;
  }
  return streakString;
};

export default addHeatScale;
