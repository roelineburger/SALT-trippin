import React from 'react';
import snow from '../assets/snow.jpg';
import './About.scss';

const About = () => (
  <main className="about-page">
    <img className="about-page__image" src={snow} alt="forest" />
    <section className="about-page__header">
      <article className="about-page__info">
        <h2 className="about-page__title">About Us</h2>
        <p className="about-page__text">
          We are a group of developers.
        </p>
      </article>
    </section>
  </main>
);

export default About;
