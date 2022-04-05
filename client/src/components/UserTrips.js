import React, { useEffect, useState } from 'react';

const UserTrips = ({ user, setdirectionsResponse }) => {
  const [userRoutes, setUserRoutes] = useState([]);

  const getRoutes = async (email) => {
    const body = {
      user: email,
    };

    const result = await fetch('http://localhost:8080/db/user', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await result.json();
    console.log(data);
    setUserRoutes(data);
  };

  useEffect(() => {
    getRoutes(user.email);
  }, []);

  const getRoute = async (obj) => {
    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route(obj);
    setdirectionsResponse(results);
    const distance = results.routes[0].legs[0].distance.text;
    console.log('distance:', distance);
  };

  const deleteRoute = (id) => {
    const body = {
      user: user.email,
      routeId: id,
    };

    fetch('http://localhost:8080/db/route', {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  };

  return (
    <ul>
      {userRoutes && (
        userRoutes.map((item) => (
          <div key={item.routeId}>
            <li>
              {item.route.origin}
              {' '}
              to
              {' '}
              {item.route.destination}
            </li>
            <button onClick={() => getRoute(item.route)}>
              SHOW
            </button>
            <button onClick={() => deleteRoute(item.routeId)}>
              DELETE
            </button>
          </div>
        ))
      )}
    </ul>
  );
};

export default UserTrips;
