import { useState } from 'react';
import Form from './Form';
import Fuel from './Fuel';
import './Sidebar.scss';

function Sidebar({
  destination, setdirectionsResponse, points, setPoints,
}) {
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
      />
      <Fuel distance={distance} info={info} />
    </div>
  );
}

export default Sidebar;
