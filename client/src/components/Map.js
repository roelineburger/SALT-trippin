import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import ParkLogo from '../assets/national.svg';
import CampLogo from '../assets/camping.svg';
import ViewpointLogo from '../assets/viewpoint.svg';
import Sidebar from './Sidebar';
import Filter from './Filter';
import './Map.scss';

const libraries = ['places'];

const Map = ({
  user, loggedIn, setDestination, destination, selected, setSelected, parks, setParks,
}) => {
  const mapRef = useRef({});
  const center = useMemo(() => ({ lat: 63.5, lng: 17.34 }), []);
  const [campGrounds, setCampGrounds] = useState([]);
  const [viewpoints, setViewpoints] = useState([]);
  const [points, setPoints] = useState([]);
  const [directionsResponse, setdirectionsResponse] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  const options = useMemo(
    () => ({
      mapId: '19283767c2583acc',
      mapTypeControl: false,
      fullscreenControl: false,
    }),
    [],
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isFiltered === false) {
      const getParks = async () => {
        const query = await fetch('http://localhost:8080/parks');
        const json = await query.json();
        setParks(json.parks);
      };
      getParks();
    }
  }, []);

  useEffect(() => {
    if (isFiltered === false) {
      const getCampGrounds = async () => {
        const query = await fetch('http://localhost:8080/camps');
        const json = await query.json();
        setCampGrounds(json.camps);
      };
      getCampGrounds();
    }
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

      setPoints((current) => [
        ...current,
        {
          lat: Number(lat),
          lng: Number(lng),
          name: geocodeResult.results[3].formatted_address,
        },
      ]);
    }
  };

  return isLoaded ? (
    <div>
      <Sidebar
        destination={destination}
        setdirectionsResponse={setdirectionsResponse}
        points={points}
        setPoints={setPoints}
        user={user}
        loggedIn={loggedIn}
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
          <DirectionsRenderer directions={directionsResponse} />
        )}
        {points.map((point) => (
          <Marker
            position={{ lat: point.lat, lng: point.lng }}
            key={point.lat}
          />
        ))}
        {parks.map((park) => (
          <Marker
            onClick={() => {
              setDestination(park.route);
              setSelected(park);
            }}
            position={park.coords}
            icon={ParkLogo}
            key={park.name}
          />
        ))}
        {campGrounds.map((camp) => (
          <Marker
            onClick={() => {
              setDestination(camp.route);
              setSelected(camp);
            }}
            position={camp.coords}
            icon={CampLogo}
            key={camp.name}
          />
        ))}
        {viewpoints && viewpoints.map((viewpoint) => (
          <Marker
            onClick={() => {
              setDestination(viewpoint.route);
              setSelected(viewpoint);
            }}
            position={viewpoint.coords}
            icon={ViewpointLogo}
            key={viewpoint.name}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.coords.lat, lng: selected.coords.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="info-container">
              <h4>{selected.name}</h4>
              <img
                className="info-container__img"
                src={selected.img}
                alt="pic"
              />
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <Filter
        setParks={setParks}
        setIsFiltered={setIsFiltered}
        setCampGrounds={setCampGrounds}
        isFiltered={isFiltered}
        setViewpoints={setViewpoints}
      />
    </div>
  ) : (
    <></>
  );
};

export default Map;
