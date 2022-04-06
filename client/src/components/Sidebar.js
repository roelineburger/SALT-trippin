import { useState } from 'react';
import Form from './Form';
import TripInfo from './TripInfo';
import './Sidebar.scss';
import UserTrips from './UserTrips';
import { post } from '../modules/httpClient';

const Sidebar = ({
  destination, setdirectionsResponse, setErrorAlert, points, setPoints, user, loggedIn,
}) => {
  const [userRoutes, setUserRoutes] = useState([]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [info, setInfo] = useState(false);
  const [trip, setTrip] = useState({});

  const getTrip = async (obj) => {
    try {
      const directionService = new window.google.maps.DirectionsService();
      const results = await directionService.route(obj);

      setTrip(obj);
      setdirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setInfo(true);
      setErrorAlert(false);
    } catch (error) {
      setErrorAlert(true);
    }
  };

  const getRoutes = async (email) => {
    const data = await post('/db/user', { user: email });
    setUserRoutes(data);
  };

  const saveTrip = async () => {
    await post('/db', { user: user.email, route: { trip } });
    getRoutes(user.email);
  };

  return (
    <div className="sidebar-container">
      <Form
        points={points}
        setPoints={setPoints}
        getTrip={getTrip}
        destination={destination}
        // setErrorAlert={setErrorAlert}
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
