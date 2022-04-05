import React, { useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Nav from './components/Nav';

const App = () => {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Nav
        setUser={setUser}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map user={user} loggedIn={loggedIn} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
