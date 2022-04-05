import { useState } from 'react';
import Form from './Form';
import Fuel from './Fuel';
import './Sidebar.scss';
import UserTrips from './UserTrips';

const Sidebar = ({
  destination, setdirectionsResponse, points, setPoints, user, loggedIn,
}) => {
  const [distance, setDistance] = useState('');
  const [info, setInfo] = useState(false);

  return (
    <div className="sidebar-container">
      <Form
        destination={destination}
        setdirectionsResponse={setdirectionsResponse}
        points={points}
        setPoints={setPoints}
        setDistance={setDistance}
        distance={distance}
        info={info}
        setInfo={setInfo}
        user={user}
        loggedIn={loggedIn}
      />
      <Fuel distance={distance} info={info} />
      {loggedIn && (
        <UserTrips user={user} setdirectionsResponse={setdirectionsResponse} />
      )}
    </div>
  );
};

export default Sidebar;
