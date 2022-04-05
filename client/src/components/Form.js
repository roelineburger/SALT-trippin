import { useState, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import polyline from 'google-polyline';
import './Form.scss';
import xBtn from '../assets/x.svg';
import plusBtn from '../assets/+.svg';

const Form = ({
  setdirectionsResponse, points, setPoints, destination, distance, setDistance, info, setInfo,
}) => {
  const originRef = useRef();
  const waypointRef = useRef();
  const destinationRef = useRef();
  const [duration, setDuration] = useState('');
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

    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value || destination,
      waypoints,
      travelMode: 'DRIVING',
      optimizeWaypoints: true,
    });

    setdirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setInfo(true);
    console.log('the route ', results);
    const decodedResult = polyline.decode( results.routes[0].overview_polyline )

    console.log('the polyline ', decodedResult);
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
    </div>
  );
};

export default Form;
