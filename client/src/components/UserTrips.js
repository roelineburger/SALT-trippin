import React, { useEffect } from 'react';
import { del } from '../modules/httpClient';
import map from '../assets/map.svg';
import cross from '../assets/x.svg';
import './UserTrips.scss';

const UserTrips = ({
  user, getTrip, getRoutes, userRoutes,
}) => {
  useEffect(() => {
    getRoutes(user.email);
  }, []);

  const deleteRoute = (id) => {
    del('/db/route', { user: user.email, routeId: id });
    getRoutes(user.email);
  };

  const minifiedRoute = (string) => {
    const [place] = string.split(',');
    return place;
  };

  return (
    <section className="trips">
      <h4 className="trips__title">Saved Trips</h4>
      <ul className="trips-list">
        {userRoutes && (
          userRoutes.map((item) => (
            <div className="trips-list__row" key={item.routeId}>
              <li className="trips-list__name">
                {minifiedRoute(item.route.origin)}
                {' '}
                to
                {' '}
                {minifiedRoute(item.route.destination)}
              </li>
              <section className="trips-list__btn">
                <button className="trips-list__btn--show" onClick={() => getTrip(item.route)}>
                  <img
                    src={map}
                    alt="map"
                    className="trips-list__btn--show--svg"
                  />
                </button>
                <button className="trips-list__btn--remove" onClick={() => deleteRoute(item.routeId)}>
                  <img src={cross} alt="X" />
                </button>
              </section>
            </div>
          ))
        )}
      </ul>
    </section>
  );
};

export default UserTrips;
