const stringToNumber = (string) => {
  const almostNotString = string.replace(/\D/g, '');
  return Number(almostNotString);
};

const mileagePrice = (km, price) => {
  const math = (km / 100) * 5.8 * price;
  return parseFloat(math).toFixed(2);
};

const shortenString = (string) => {
  if (string.includes('day')) {
    const days = string.replace(/ day/, 'd');
    const hours = days.replace(/ hours/, 'h');
    return hours;
  }

  const hours = string.replace(/ hours/, 'h');
  const minutes = hours.replace(/ mins/, 'm');
  return minutes;
};

export {
  stringToNumber,
  mileagePrice,
  shortenString,
};
