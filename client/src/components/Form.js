import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./Form.scss"

const Form = ({ setdirectionsResponse, points, destination }) => {
  const originRef = useRef();
  const destinationRef = useRef();
  console.log(destination)
  
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [info, setInfo] = useState(false)

  const waypoints = [];

  points.map(point => {
    return waypoints.push({
      location: {
        lat: point.lat,
        lng: point.lng
      },
      stopover: false
    })
  })

  const calculateRoute = async (e) => {
    e.preventDefault();
    // if (originRef.current.value === "" || destinationRef.current.value === "") {
    //   return
    // }
    
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

  return (
    <div className="form-container">
      <form className="form-container__form">
        <Autocomplete>
          <input ref={originRef} type="text" placeholder="Origin" className="form-container__input"/>
        </Autocomplete>
        <Autocomplete>
          <input ref={destinationRef} type="text" placeholder={destination ? destination : 'Destination'} className="form-container__input"/>
        </Autocomplete>
        <button onClick={calculateRoute} className="form-container__button">GET ROUTE</button>
      </form>
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
