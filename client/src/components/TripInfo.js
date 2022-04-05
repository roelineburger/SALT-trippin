import React, { useState, useEffect } from 'react';
import { stringToNumber, mileagePrice } from '../modules/utils';
import { get } from '../modules/httpClient';
import './TripInfo.scss';

const Fuel = ({
  distance, duration, saveTrip, loggedIn,
}) => {
  const [petrolPrice, setPetrolPrice] = useState(0);
  const [dieselPrice, setDieselPrice] = useState(0);
  const [cost, setCost] = useState(false);

  const getFuelPrice = async () => {
    const data = await get('/fuel');
    const petrol = mileagePrice(
      stringToNumber(distance),
      parseFloat(data.petrol),
    );
    const diesel = mileagePrice(stringToNumber(distance), parseFloat(data.diesel));

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
