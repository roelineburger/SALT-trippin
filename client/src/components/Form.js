import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./Form.scss"

const Form = ({ setdirectionsResponse, points, setPoints, destination, distance, setDistance, info, setInfo }) => {
  const originRef = useRef();
  const waypointRef = useRef();
  const destinationRef = useRef();
  const [duration, setDuration] = useState("");
  let waypoints = [];

  points.map(point => waypoints
    .push({
      location: {
        lat: point.lat,
        lng: point.lng
      },
      stopover: false
    })
  )
  
  const calculateRoute = async (e) => {
    e.preventDefault();

    if (waypointRef.current.value) {
      waypoints.push({
        location: waypointRef.current.value,
        stopover: false
      })
    }

    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value || destination,
      waypoints,
      travelMode: "DRIVING",
      optimizeWaypoints: true
    });

    setdirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setInfo(true);
  };

  const addWaypointInput = (e) => {
    e.preventDefault();
    document.getElementById('waypoint-field').classList.toggle('form-container__input--hidden')
    document.getElementById('waypoint-button').classList.toggle('form-container__waypoint-button--hidden')
  }

  const clearWaypoints = () => {
    waypoints = [];
    setPoints([]);
    waypointRef.current.value = '';
  }

  const removeOneWaypoint = (e, id) => {
    e.preventDefault()
    setPoints(points.filter(dogpoop => id !== dogpoop.lat))
  }

  return (
    <div>
      <form className="form-container__form">
        <Autocomplete>
          <input
            ref={originRef}
            type="text"
            placeholder="Origin"
            className="form-container__input" />
        </Autocomplete>
        <button
          id="waypoint-button"
          className="form-container__waypoint-button"
          onClick={addWaypointInput}>+</button>
          {points.map((point,index) => (
            <section key={index}>
              <p>Point: {index}</p>
              <button  onClick={(e)=> removeOneWaypoint(e, point.lat)}>x</button>
            </section>
          ))}
        <Autocomplete>
          <input
            id="waypoint-field"
            ref={waypointRef}
            type="text"
            placeholder="Waypoint"
            className="form-container__input form-container__input--hidden" />
        </Autocomplete>
        <Autocomplete>
          <input
            ref={destinationRef}
            type="text"
            placeholder={destination ? destination : 'Destination'} className="form-container__input" />
        </Autocomplete>
        <button
          onClick={calculateRoute}
          className="form-container__button">GET ROUTE</button>
      </form>
      <button onClick={clearWaypoints}>CLEAR WAYPOINTS</button>
      {info && (
        <section className="form-routeinfo">
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </section>
      )}
    </div>
  );
};

export default Form;
