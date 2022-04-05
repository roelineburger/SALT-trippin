import React from 'react';
import './Filter.scss';
import ParkLogo from '../assets/national.svg';
import CampLogo from '../assets/camping.svg';
import ViewpointLogo from '../assets/viewpoint.svg';
import xSvg from '../assets/x.svg';

const Filter = ({
  setIsFiltered, setParks, setCampGrounds, isFiltered, setViewpoints,
}) => {
  const fetchParks = async () => {
    const query = await fetch('http://localhost:8080/parks');
    const json = await query.json();
    return json;
  };

  const fetchCampGrounds = async () => {
    const query = await fetch('http://localhost:8080/camps');
    const json = await query.json();
    return json;
  };
  const fetchViewpoints = async () => {
    const query = await fetch('http://localhost:8080/viewpoints');
    const json = await query.json();
    return json;
  };

  const getParks = async () => {
    const theParks = await fetchParks();
    setIsFiltered(true);
    setParks(theParks.parks);
    setCampGrounds([]);
  };

  const getCampGrounds = async () => {
    const theCampGrounds = await fetchCampGrounds();
    setIsFiltered(true);
    setCampGrounds(theCampGrounds.camps);
    setParks([]);
  };
  const getViewpoints = async () => {
    const theViewpoints = await fetchViewpoints();
    setIsFiltered(true);
    setViewpoints(theViewpoints.viewpoint);
    setCampGrounds([]);
    setParks([]);
  };

  const clearFilters = async () => {
    setIsFiltered(false);
    const theParks = await fetchParks();
    setParks(theParks.parks);
    const theCampGrounds = await fetchCampGrounds();
    setCampGrounds(theCampGrounds.camps);
  };

  return (
    <div className="filter-container">
      <button className="filter-container__btn" onClick={getParks}><img src={ParkLogo} alt="park" className="park-logo" /></button>
      <button className="filter-container__btn" onClick={getCampGrounds}><img src={CampLogo} alt="camp-logo" /></button>
      <button className="filter-container__btn" onClick={getViewpoints}><img src={ViewpointLogo} alt="viewpoint-logo" /></button>
      {isFiltered ? (
        <button className="filter-container__btn" onClick={clearFilters}><img src={xSvg} alt="x" /></button>
      ) : null}
    </div>
  );
};

export default Filter;
