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
  const getParks = async () => {
    const theParks = await get('/parks');
    setIsFiltered(true);
    setParks(theParks.parks);
    setCampGrounds([]);
    setViewpoints([]);
  };

  const getCampGrounds = async () => {
    const theCampGrounds = await get('/camps');
    setIsFiltered(true);
    setCampGrounds(theCampGrounds.camps);
    setParks([]);
    setViewpoints([]);
  };

  const getViewpoints = async () => {
    const theViewpoints = await get('/viewpoints');
    setIsFiltered(true);
    setViewpoints(theViewpoints.viewpoint);
    setCampGrounds([]);
    setParks([]);
  };

  const clearFilters = async () => {
    setIsFiltered(false);
    const theParks = await get('/parks');
    setParks(theParks.parks);
    const theCampGrounds = await get('/camps');
    setCampGrounds(theCampGrounds.camps);
    setViewpoints([]);
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
