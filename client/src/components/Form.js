import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const Form = ({ setdirectionsResponse }) => {
  const originRef = useRef();
  const destinationRef = useRef();

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const calculateRoute = async (e) => {
    e.preventDefault();
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: "DRIVING",
    });

    setdirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  return (
    <div className="form-container">
      <form>
        <Autocomplete>
          <input ref={originRef} type="text" placeholder="origin" />
        </Autocomplete>
        <Autocomplete>
          <input ref={destinationRef} type="text" placeholder="destination" />
        </Autocomplete>
        <button onClick={calculateRoute}>Get Route</button>
      </form>
      <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
    </div>
  );
};

export default Form;
