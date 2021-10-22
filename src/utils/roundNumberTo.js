const roundNumberTo = (number, places) => {
  let negative = false;
  if (places === undefined) {
    places = 0;
  }
  if (number < 0) {
    negative = true;
    number = number * -1;
  }
  const multiplier = Math.pow(10, places);
  number = parseFloat((number * multiplier).toFixed(11));
  number = (Math.round(number) / multiplier).toFixed(2);
  if (negative) {
    number = (number * -1).toFixed(2);
  }
  return Number(number);
};

module.exports = roundNumberTo;
