import React, { useState, useEffect } from 'react';
import { stringToNumber, mileagePrice, shortenString } from '../modules/utils';
import { get } from '../modules/httpClient';
import './TripInfo.scss';
import petrol from '../assets/petrol.svg';
import diesel from '../assets/diesel.svg';
import route from '../assets/route.svg';
import timer from '../assets/timer.svg';

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

  const shortDur = shortenString(duration);
  useEffect(() => {
    getFuelPrice();
  }, [distance]);

  return (
    <>
      {cost && (
        <section className="form-routeinfo">
          <section className="form-routeinfo__petrol">
            <img className="form-routeinfo__svg" src={petrol} alt="petrol" />
            <p className="form-routeinfo__text">
              {petrolPrice}
              {' '}
              Kr
            </p>
          </section>
          <section className="form-routeinfo__diesel">
            <img className="form-routeinfo__svg" src={diesel} alt="diesel" />
            <p className="form-routeinfo__text">
              {dieselPrice}
              {' '}
              Kr
            </p>
          </section>
          <section className="form-routeinfo__distance">
            <img className="form-routeinfo__svg" src={route} alt="distance" />
            <p className="form-routeinfo__text">{distance}</p>
          </section>
          <section className="form-routeinfo__duration">
            <img className="form-routeinfo__svg" src={timer} alt="duration" />
            <p className="form-routeinfo__text">
              {shortDur}
              {' '}
            </p>
          </section>
        </section>
      )}
      {loggedIn && (
        <button
          id="save-button"
          className="form-routeinfo__button"
          onClick={saveTrip}
        >
          SAVE ROUTE
        </button>
      )}
    </>
  );
};

export default Fuel;
