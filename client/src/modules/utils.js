const stringToNumber = (string) => {
  const almostNotString = string.replace(/\D/g, '');
  return Number(almostNotString);
};

const mileagePrice = (km, price) => {
  const math = (km / 100) * 5.8 * price;
  return parseFloat(math).toFixed(2);
};

export {
  stringToNumber,
  mileagePrice,
};
