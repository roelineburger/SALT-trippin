import { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import './Form.scss';
import xBtn from '../assets/x.svg';
import plusBtn from '../assets/+.svg';

const Form = ({
  points,
  setPoints,
  destination,
  getTrip,
  setdirectionsResponse,
  setInfo,
}) => {
  const originRef = useRef();
  const waypointRef = useRef();
  const destinationRef = useRef();

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

    getTrip(routeObj);
  };

  const addWaypointInput = (e) => {
    e.preventDefault();
    document.getElementById('waypoint-field').classList.toggle('form-container__input--hidden');
    document.getElementById('waypoint-button').classList.toggle('form-container__waypoint-button--hidden');
  };

  const clearWaypoints = (e) => {
    e.preventDefault();
    waypoints = [];
    setPoints([]);
    waypointRef.current.value = '';
    originRef.current.value = '';
    destinationRef.current.value = '';
    setInfo(false);
    setdirectionsResponse(null);
  };

  const removeOneWaypoint = (e, id) => {
    e.preventDefault();
    setPoints(points.filter((marker) => id !== marker.lat));
  };

  return (
    <>
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
        <section className="marker-container">
          {points.map((point) => (
            <section className="marker-container__row" key={point.lat}>
              <p className="marker-container__row--name">{point.name}</p>
              <button className="marker-container__row--btn" onClick={(e) => removeOneWaypoint(e, point.lat)}><img src={xBtn} alt="X" /></button>
            </section>
          ))}
        </section>
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
        <section className="form-container__button">
          <button
            className="form-container__button--clear"
            onClick={(e) => clearWaypoints(e)}
          >
            CLEAR
          </button>
          <button
            onClick={calculateRoute}
            className=" form-container__button--get"
          >
            ROUTE
          </button>
        </section>
      </form>
    </>
  );
};

export default Form;
