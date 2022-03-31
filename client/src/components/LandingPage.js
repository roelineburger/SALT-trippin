import React from 'react';
import { useNavigate } from 'react-router-dom';

import './LandingPage.scss';

function LandingPage() {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate('/map');
  };

  return (
    <>
      <div className="landing-container">
        <h1>Welcome to our fantastic site</h1>
        <button onClick={buttonHandler}>Go to map</button>
      </div>
    </>
  );
}

export default LandingPage;
