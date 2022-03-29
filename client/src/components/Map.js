import { useCallback, useState, useMemo, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import Form from "./Form";
import ParkLogo from "../assets/national.svg";

const libraries = ["places"];

const Map = () => {
  const mapRef = useRef({});
  const center = useMemo(() => ({ lat: 63.50, lng: 17.34 }), []);
  const [parks, setParks] = useState([]);
  const [points, setPoints] = useState([]);
  const [destination, setDestination] = useState('')
  
  const options = useMemo(() => ({
      mapId: '19283767c2583acc',
      mapTypeControl: false,
      fullscreenControl: false,
  }), [])


  const [directionsResponse, setdirectionsResponse] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  useEffect(() => {
    const getParks = async () => {
      const query = await fetch("http://localhost:8080/parks");
      const json = await query.json();
      setParks(json.parks);
    };
    getParks();
  }, []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const onMapClick = useCallback((waypoint) => {
    if (directionsResponse) {
      const lat = parseFloat(waypoint.latLng.lat().toFixed(8));
      const lng = parseFloat(waypoint.latLng.lng().toFixed(8));
  
      setPoints((current) => [...current, { 
        lat: Number(lat),
        lng: Number(lng),
        latLng: waypoint.latLng
      }])
    }
  })

  const onMarkerClick = (park) => {
    setDestination(park)
  }

  return isLoaded ? (
    <div>
      <Form destination={destination} setdirectionsResponse={setdirectionsResponse} points={points} />
      <GoogleMap
        zoom={5}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={center}
        onLoad={onLoad}
        onClick={onMapClick}
        options={options}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} suppressMarkers={true}/>
        )}
        {points.map((point, index) => (
          <Marker position={{ lat: point.lat, lng: point.lng }} key={index} />
        ))}
        {parks.map((park, index) => (
          <Marker onClick={() => onMarkerClick(park.route)} position={park.coords} icon={ParkLogo} key={index} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Map;
