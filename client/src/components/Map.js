import React, {
  useCallback, useState, useMemo, useRef, useEffect,
} from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';
import ParkLogo from '../assets/national.svg';
import Sidebar from './Sidebar';

const libraries = ['places'];

function Map() {
  const mapRef = useRef({});
  const center = useMemo(() => ({ lat: 63.50, lng: 17.34 }), []);
  const [parks, setParks] = useState([]);
  const [points, setPoints] = useState([]);
  const [destination, setDestination] = useState('');

  const options = useMemo(() => ({
    mapId: '19283767c2583acc',
    mapTypeControl: false,
    fullscreenControl: false,
  }), []);

  const [directionsResponse, setdirectionsResponse] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  useEffect(() => {
    const getParks = async () => {
      const query = await fetch('http://localhost:8080/parks');
      const json = await query.json();
      setParks(json.parks);
    };
    getParks();
  }, []);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = async (waypoint) => {
    if (directionsResponse) {
      const lat = parseFloat(waypoint.latLng.lat().toFixed(8));
      const lng = parseFloat(waypoint.latLng.lng().toFixed(8));

      const geocoder = new window.google.maps.Geocoder();
      const geocodeResult = await geocoder.geocode({
        location: waypoint.latLng,
      });

      setPoints((current) => [...current, {
        lat: Number(lat),
        lng: Number(lng),
        name: geocodeResult.results[3].formatted_address,
      },
      ]);
    }
  };

  const onMarkerClick = (park) => {
    setDestination(park);
  };

  return isLoaded ? (
    <div>
      <Sidebar
        destination={destination}
        setdirectionsResponse={setdirectionsResponse}
        points={points}
        setPoints={setPoints}
      />
      <GoogleMap
        zoom={5}
        mapContainerStyle={{ width: '100vw', height: '100vh' }}
        center={center}
        onLoad={onLoad}
        onClick={onMapClick}
        options={options}
      >
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
          // onDirectionsChanged={() => directionsResponse}
          // options={{
          //   draggable: true,
          //   panel: test,
          //   suppressMarkers: true
          // }}
          />
        )}
        {points.map((point) => (
          <Marker
            position={{ lat: point.lat, lng: point.lng }}
            key={point.lat}
          />
        ))}
        {parks.map((park) => (
          <Marker
            onClick={() => onMarkerClick(park.route)}
            position={park.coords}
            icon={ParkLogo}
            key={park.name}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;
