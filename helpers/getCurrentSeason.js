const getCurrentSeason = (month) => {
  if (month >= 2 && month <= 3) { // feb to may
    return "spring";
  } else if (month >= 4 && month <= 7) { // may to aug
    return "summer";
  } else if (month >= 8 && month <= 10) {// sept to nov
    return "fall";
  } else if (month >= 11 || month < 1) { // december to feb
    return "winter";
  }
}

export default getCurrentSeason;
