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
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 59.32, lng: 18.06 }), []);
  const [parks, setParks] = useState([]);

  const [directionsResponse, setdirectionsResponse] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  useEffect(() => {
    const getParks = async () => {
      const query = await fetch("http://localhost:4000/parks");
      const json = await query.json();
      setParks(json.parks);
    };
    getParks();
  }, []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return isLoaded ? (
    <div>
      <Form setdirectionsResponse={setdirectionsResponse} />
      <GoogleMap
        zoom={10}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={center}
        onLoad={onLoad}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        {parks.map((park, index) => (
          <Marker position={park.coords} icon={ParkLogo} key={index} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Map;
