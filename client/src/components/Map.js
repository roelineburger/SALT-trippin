import { useCallback, useState, useMemo, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Form from "./Form";

const libraries = ["places"];

const Map = () => {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 59.32, lng: 18.06 }), []);

  const [directionsResponse, setdirectionsResponse] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  // const onLoad = useCallback((mapInstance) => {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   mapInstance.fitBounds(bounds);
  //   setMap(map);
  // }, []);

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
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Map;
