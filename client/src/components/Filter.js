import React from 'react';
import './Filter.scss';
import ParkLogo from '../assets/national.svg';
import CampLogo from '../assets/camping.svg';
import ViewpointLogo from '../assets/viewpoint.svg';
import xSvg from '../assets/x.svg';
import { get } from '../modules/httpClient';

const Filter = ({
  setIsFiltered, setParks, setCampGrounds, isFiltered, setViewpoints,
}) => {
  const fetchParks = async () => {
    const data = await get('/parks');
    return data;
  };

  const fetchCampGrounds = async () => {
    const data = await get('/camps');
    return data;
  };
  const fetchViewpoints = async () => {
    const data = await get('/viewpoints');
    return data;
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
