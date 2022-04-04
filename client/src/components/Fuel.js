import React, { useState } from 'react';
import './Fuel.scss';

const stringToNumber = (string) => {
  const almostNotString = string.replace(/\D/g, '');
  return Number(almostNotString);
};

const Fuel = ({ distance, info }) => {
  const [petrolPrice, setPetrolPrice] = useState(0);
  const [dieselPrice, setDieselPrice] = useState(0);
  const [cost, setCost] = useState(false);

  const mileagePrice = (km, price) => {
    const math = (km / 100) * 5.8 * price;
    return parseFloat(math).toFixed(2);
  };

  const getFuelPrice = async () => {
    const query = await fetch('http://localhost:8080/fuel');
    const json = await query.json();
    const petrol = mileagePrice(
      stringToNumber(distance),
      parseFloat(json.petrol),
    );
    const diesel = mileagePrice(stringToNumber(distance), parseFloat(json.diesel));

    setDieselPrice(diesel);
    setPetrolPrice(petrol);
    setCost(true);
  };

  return info ? (
    <>
      <button onClick={getFuelPrice} className="form-container__button">GET FUEL COST</button>
      {cost && (
        <section>
          <p>
            Petrol Price:
            {petrolPrice}
            {' '}
            Kr
          </p>
          <p>
            Diesel Price:
            {dieselPrice}
            {' '}
            Kr
          </p>
        </section>
      )}
    </>
  ) : <></>;
};

export default Fuel;
