import { useState, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import './Form.scss';
import xBtn from '../assets/x.svg';
import plusBtn from '../assets/+.svg';

const Form = ({
  setdirectionsResponse,
  user,
  points,
  setPoints,
  destination,
  distance,
  setDistance,
  info,
  setInfo,
  loggedIn,
}) => {
  const originRef = useRef();
  const waypointRef = useRef();
  const destinationRef = useRef();
  const [duration, setDuration] = useState('');
  const [trip, setTrip] = useState({});
  let waypoints = [];

  points.map((point) => waypoints
    .push({
      location: {
        lat: point.lat,
        lng: point.lng,
      },
      stopover: false,
    }));

  const calculateRoute = async (e) => {
    e.preventDefault();

    if (waypointRef.current.value) {
      waypoints.push({
        location: waypointRef.current.value,
        stopover: false,
      });
    }

    const routeObj = {
      origin: originRef.current.value,
      destination: destinationRef.current.value || destination,
      waypoints,
      travelMode: 'DRIVING',
      optimizeWaypoints: true,
    };

    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route(routeObj);

    setTrip(routeObj);
    setdirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setInfo(true);
  };

  const addWaypointInput = (e) => {
    e.preventDefault();
    document.getElementById('waypoint-field').classList.toggle('form-container__input--hidden');
    document.getElementById('waypoint-button').classList.toggle('form-container__waypoint-button--hidden');
  };

  const clearWaypoints = () => {
    waypoints = [];
    setPoints([]);
    waypointRef.current.value = '';
  };

  const removeOneWaypoint = (e, id) => {
    e.preventDefault();
    setPoints(points.filter((marker) => id !== marker.lat));
  };

  const saveTrip = () => {
    const body = {
      user: user.email,
      route: {
        trip,
      },
    };

    fetch('http://localhost:8080/db', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  };

  return (
    <div className="form-container__form">
      <form className="form-container__form">
        <Autocomplete>
          <input
            ref={originRef}
            type="text"
            placeholder="Origin"
            className="form-container__input"
          />
        </Autocomplete>
        <button
          id="waypoint-button"
          className="form-container__waypoint-button"
          onClick={addWaypointInput}
        >
          <img src={plusBtn} alt="plus" />
        </button>
        {points.map((point) => (
          <section className="marker-container" key={point.lat}>
            <p className="marker-container__name">{point.name}</p>
            <button className="marker-container__btn" onClick={(e) => removeOneWaypoint(e, point.lat)}><img src={xBtn} alt="X" /></button>
          </section>
        ))}
        <Autocomplete>
          <input
            id="waypoint-field"
            ref={waypointRef}
            type="text"
            placeholder="Waypoint"
            className="form-container__input form-container__input--hidden"
          />
        </Autocomplete>
        <Autocomplete>
          <input
            ref={destinationRef}
            type="text"
            placeholder={destination || 'Destination'}
            className="form-container__input"
          />
        </Autocomplete>
        <button
          onClick={calculateRoute}
          className="form-container__button"
        >
          GET ROUTE
        </button>
      </form>
      {waypoints.length > 0 && (
        <button className="form-container__button" onClick={clearWaypoints}>CLEAR MARKERS</button>
      )}
      {info && (
        <section className="form-routeinfo">
          <p>
            Distance:
            {distance}
          </p>
          <p>
            Duration:
            {duration}
          </p>
        </section>
      )}
      {loggedIn && info && (
      <button
        id="save-button"
        className="form-container__button"
        onClick={saveTrip}
      >
        SAVE
      </button>
      )}
    </div>
  );
};

export default Form;
