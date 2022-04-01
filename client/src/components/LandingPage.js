import React from 'react';
import { useNavigate } from 'react-router-dom';
// import beach from '../assets/beach.jpg';
// import van from '../assets/van.jpg';
// import topo from '../assets/topo.jpg';
import snow from '../assets/snow.jpg';
import sandon from '../assets/sandon.jpeg';
import stenshuvud from '../assets/stenshuvud.jpeg';
import abisko from '../assets/abisko.jpeg';
import kosterhavet from '../assets/kosterhavet.jpeg';
import sonfjallet from '../assets/sonfjallet.jpeg';
import tresticklan from '../assets/tresticklan.jpeg';
import './LandingPage.scss';

function LandingPage() {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate('/map');
  };
  return (
    <main className="landing-page">
      <img className="landing-page__image" src={snow} alt="forest" />
      <section className="landing-page__header">
        <article className="landing-page__info">
          <h2 className="landing-page__title">Plan your next roadtrip</h2>
          <p className="landing-page__text">
            Ut officia qui exercitation quis ut Lorem aliqua id.
            Ex ea labore in aute.
            Ut in fugiat veniam ipsum laboris commodo enim.
            Deserunt sint nostrud anim sunt laborum pariatur reprehenderit eu laborum.
          </p>
          <button className="landing-page__info--button" onClick={() => { buttonHandler(); }}>Go to map</button>
        </article>
        <article className="landing-page__info">
          <h1
            className="landing-page__title"
          >
            Discover National Parks In Sweden
          </h1>
          <section className="suggestions">
            <button className="suggestions__wrap" onClick={buttonHandler}>
              <img
                className="suggestions__img"
                src={sandon}
                alt="pic"
              />
              <p className="suggestions__name">Gotska Sandön</p>
            </button>
            <button className="suggestions__wrap" onClick={buttonHandler}>
              <img
                className="suggestions__img"
                src={stenshuvud}
                alt="pic"
              />
              <p className="suggestions__name">Stenshuvud</p>
            </button>
            <button className="suggestions__wrap" onClick={buttonHandler}>
              <img
                className="suggestions__img"
                src={abisko}
                alt="pic"
              />
              <p className="suggestions__name">Abisko</p>
            </button>
            <button className="suggestions__wrap" onClick={buttonHandler}>
              <img
                className="suggestions__img"
                src={kosterhavet}
                alt="pic"
              />
              <p className="suggestions__name">Kosterhavet</p>
            </button>
            <button className="suggestions__wrap" onClick={buttonHandler}>
              <img
                className="suggestions__img"
                src={sonfjallet}
                alt="pic"
              />
              <p className="suggestions__name">Sonfjallet</p>
            </button>
            <button className="suggestions__wrap" onClick={buttonHandler}>
              <img
                className="suggestions__img"
                src={tresticklan}
                alt="pic"
              />
              <p className="suggestions__name">Tresticklan</p>
            </button>
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
}

export default LandingPage;
