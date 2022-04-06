import React from 'react';
import { useNavigate } from 'react-router-dom';
import snow from '../assets/snow.jpg';
import './LandingPage.scss';

const LandingPage = ({ setDestination, setSelected, parks }) => {
  const navigate = useNavigate();

  const goToMapButton = () => {
    navigate('/map');
  };

  const buttonHandler = (obj) => {
    navigate('/map');
    setDestination(obj.route);
    setSelected(obj);
  };

  return (
    <main className="landing-page">
      <img className="landing-page__image" src={snow} alt="forest" />
      <section className="landing-page__header">
        <article className="landing-page__info">
          <h2 className="landing-page__title">Plan your next roadtrip</h2>
          <p className="landing-page__text">
            Plan your dream trip and discover amazing stops along your route.
          </p>
          <button className="landing-page__info--button" onClick={goToMapButton}>Go to map</button>
        </article>
        <article className="landing-page__info">
          <h1
            className="landing-page__title"
          >
            Discover National Parks In Sweden
          </h1>
          <section className="suggestions">
            {parks.map((park) => (
              <button key={park.name} className="suggestions__wrap" onClick={() => buttonHandler(park)}>
                <img
                  className="suggestions__img"
                  src={park.img}
                  alt="pic"
                />
                <p className="suggestions__name">{park.name}</p>
              </button>
            ))}
          </section>
          <button
            className="suggestions__scroll"
            onClick={() => {
              document.querySelector('.suggestions').scrollLeft -= 100;
            }}
          >
            {'<'}
          </button>
          <button
            className="suggestions__scroll"
            onClick={() => {
              document.querySelector('.suggestions').scrollLeft += 100;
            }}
          >
            {'>'}
          </button>
        </article>
      </section>
    </main>
  );
};

export default LandingPage;
