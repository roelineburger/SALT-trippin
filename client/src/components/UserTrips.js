import React, { useEffect } from 'react';
import { del } from '../modules/httpClient';
import './UserTrips.scss';

const UserTrips = ({
  user, getTrip, getRoutes, userRoutes,
}) => {
  useEffect(() => {
    getRoutes(user.email);
  }, []);

  const deleteRoute = async (id) => {
    await del('/db/route', { user: user.email, routeId: id });
    getRoutes(user.email);
  };

  return (
    <ul className="trips-list">
      {userRoutes && (
        userRoutes.map((item) => (
          <div className="trips-list__row" key={item.routeId}>
            <li className="trips-list__name">
              {item.route.origin}
              {' '}
              to
              {' '}
              {item.route.destination}
            </li>
            <button className="trips-list__btn--show" onClick={() => getTrip(item.route)}>
              SHOW
            </button>
            <button className="trips-list__btn--remove" onClick={() => deleteRoute(item.routeId)}>
              DELETE
            </button>
          </div>
        ))
      )}
    </ul>
  );
};

export default UserTrips;
