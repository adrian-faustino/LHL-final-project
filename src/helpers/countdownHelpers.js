const formatMS = totalMS => {
  let totalMS_ = totalMS;

  const h = Math.floor(totalMS_ / (60 * 60 * 1000));
  if (h > 0) {
    totalMS_ = totalMS_ - (h * 60 * 60 * 1000);
  }

  const m = Math.floor(totalMS_ / (60 * 1000));
  if (m > 0) {
    totalMS_ = totalMS_ - (m * 60 * 1000);
  }

  const s = Math.floor(totalMS_ / (1000));
  if (s > 0) {
    totalMS_ = totalMS_ - (s * 1000);
  }
 
  const ms = totalMS_;

  return {h, m, s, ms};
};

const formatZero = (num, places) => {
  let char = num.toString();

  while (char.length < places) {
    char = '0' + char;
  }

  return char;
}

const countdownHelpers = {
  formatZero,
  formatMS
};

export default countdownHelpers;