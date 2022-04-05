import React, { useState, useEffect } from 'react';
import './TripInfo.scss';

const stringToNumber = (string) => {
  const almostNotString = string.replace(/\D/g, '');
  return Number(almostNotString);
};

const Fuel = ({
  distance, duration, saveTrip, loggedIn,
}) => {
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

  useEffect(() => {
    getFuelPrice();
  }, [distance]);

  return (
    <>
      {cost && (
        <section className="form-routeinfo">
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
          <p>
            Distance:
            {distance}
          </p>
          <p>
            Duration:
            {duration}
          </p>
        </section>
      )}
      {loggedIn && (
        <button
          id="save-button"
          className="form-container__button"
          onClick={saveTrip}
        >
          SAVE
        </button>
      )}
    </>
  );
};

export default Fuel;
