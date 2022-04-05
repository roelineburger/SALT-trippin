import { useState } from 'react';
import Form from './Form';
import TripInfo from './TripInfo';
import './Sidebar.scss';
import UserTrips from './UserTrips';

const Sidebar = ({
  destination, setdirectionsResponse, points, setPoints, user, loggedIn,
}) => {
  const [userRoutes, setUserRoutes] = useState([]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [info, setInfo] = useState(false);
  const [trip, setTrip] = useState({});

  const getTrip = async (obj) => {
    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route(obj);

    setTrip(obj);
    setdirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setInfo(true);
  };

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
    setUserRoutes(data);
  };

  const saveTrip = async () => {
    const body = {
      user: user.email,
      route: {
        trip,
      },
    };

    await fetch('http://localhost:8080/db', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    getRoutes(user.email);
  };

  return (
    <div className="sidebar-container">
      <Form
        points={points}
        setPoints={setPoints}
        getTrip={getTrip}
        destination={destination}
      />
      {info && (
        <TripInfo
          distance={distance}
          duration={duration}
          saveTrip={saveTrip}
          loggedIn={loggedIn}
        />
      )}
      {loggedIn && (
        <UserTrips
          user={user}
          setdirectionsResponse={setdirectionsResponse}
          getTrip={getTrip}
          getRoutes={getRoutes}
          userRoutes={userRoutes}
        />
      )}
    </div>
  );
};

export default Sidebar;
