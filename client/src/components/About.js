import React from 'react';
import snow from '../assets/snow.jpg';
import './About.scss';
import roeline from "../assets/roeline.png";
import joan from "../assets/joan.png";

const About = () => (
  <main className="about-page">
    <img className="about-page__image" src={snow} alt="forest" />
    <section className="about-page__header">
      <article className="about-page__info">
        <h2 className="about-page__title">About Us</h2>
        <p className="about-page__text">
          We are a group of four developers with different nationalities and backgrounds
          <br />
          coming together to change the world one line of code at a time.
          {' '}
        </p>
        <section className="image-container">
          <div>
            <img className="profile-image" src={roeline} alt="roeline2" />
            <h4>Izabela</h4>
          </div>
          <div>
            <img className="profile-image" src={roeline} alt="roeline" />
            <h4>Roeline</h4>
          </div>
          <div>
            <img className="profile-image" src={joan} alt="joan2" />
            <h4>Alex</h4>
          </div>
          <div>
            <img className="profile-image" src={joan} alt="joan" />
            <h4>Joan</h4>
          </div>
        </section>
        <p>This is our graduation project</p>
        <p>While this is great in many cases when you need to perform</p>
      </article>
    </section>
  </main>
);

export default About;
