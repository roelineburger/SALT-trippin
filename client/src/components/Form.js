import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./Form.scss"

const stringToNumber = (string) => {
  const almostNotString = string.replace(/\D/g, '');
  return Number(almostNotString);
}

const Form = ({ setdirectionsResponse, points, destination }) => {
  const originRef = useRef();
  const destinationRef = useRef();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [petrolPrice, setPetrolPrice] = useState(0);
  const [dieselPrice, setDieselPrice] = useState(0);
  const [info, setInfo] = useState(false);
  const [cost, setCost] = useState(false)

  const waypoints = [];

  points.map(point => waypoints
    .push({
      location: {
        lat: point.lat,
        lng: point.lng
      },
      stopover: false
    })
  )

  const mileagePrice = (km, price) => {
   const cost = (km / 100) * 5.8 * price;
   return parseFloat(cost).toFixed(2);
  }

  const getFuelPrice = async () => {
    const query = await fetch('http://localhost:4000/fuel');
    const json = await query.json();
    const petrol = mileagePrice(stringToNumber(distance), parseFloat(json.petrol));
    const diesel = mileagePrice(stringToNumber(distance), parseFloat(json.diesel));
    
    setDieselPrice(diesel);
    setPetrolPrice(petrol);
    setCost(true)
  }

  const calculateRoute = async (e) => {
    e.preventDefault();
    
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
          <button onClick={getFuelPrice} className="form-container__button">GET GAS COST</button>
          {cost && (
            <section>
              <p>Petrol Price: {petrolPrice} Kr</p>
              <p>Diesel Price: {dieselPrice} Kr</p>
            </section>
          )}
        </section> 
      )}
    </div>
  );
};

export default Form;
