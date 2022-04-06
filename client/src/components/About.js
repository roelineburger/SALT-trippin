import React from 'react';
import road from '../assets/4.png';
import './About.scss';
import roeline from "../assets/roeline.png";
import joan from "../assets/joan.png";
import alex from "../assets/alex.png";
import izabela from "../assets/izabela.png";
import github from '../assets/GitHub.png';
import linkedin from '../assets/linkedin.svg';

const About = () => (

  <main className="about-page">
    <img className="about-page__image" src={road} alt="forest" />
    <section className="about-page__header">
      <article className="about-page__info">
        <h2 className="about-page__title">Our Story</h2>
        <p className="about-page__text">
          We are a group of four developers who met at SALT 3 months ago.
          <br />
          A Swede, French, South African and Pole were matched to be joined in holy matrimony, for the next 3 months that followed, in Team FPS.
          <br />
          Our mission was clear: learn to code, survive the bootcamp, drink enough water, Oh and TAKE BREAKS!
          <br />
          We are proud to showcase our Graduation project: TRIPPIN.
          {' '}
        </p>
        <section className="about-page__project-info">
          <h1>The Team</h1>
          <p>Each one of us brings another vantage point to the table which has helped tremendously during this bootcamp.</p>
        </section>
        <section className="image-container">
          <div classsName="profile">
            <img className="profile-image" src={izabela} alt="izabela" />
            <h4 className="profile-name">Izabela</h4>
            <a href="https://www.linkedin.com/in/izabela-szymczyk-603514114/" target="_blank" rel="noreferrer" className="profile-icons"><img src={linkedin} alt="github" /></a>
            <a href="https://github.com/SzymczykI" target="_blank" rel="noreferrer" className="profile-icons"><img src={github} alt="github" /></a>
          </div>
          <div classsName="profile">
            <img className="profile-image" src={roeline} alt="roeline" />
            <h4 className="profile-name">Roeline</h4>
            <a href="https://www.linkedin.com/in/roeline-burger-781b62100/" target="_blank" rel="noreferrer" className="profile-icons"><img src={linkedin} alt="github" /></a>
            <a href="https://github.com/roelineburger" target="_blank" rel="noreferrer" className="profile-icons"><img src={github} alt="github" /></a>
          </div>
          <div classsName="profile">
            {' '}
            <img className="profile-image" src={alex} alt="alex" />
            <h4 className="profile-name">Alexander</h4>
            <a href="https://www.linkedin.com/in/hirdman/" target="_blank" rel="noreferrer" className="profile-icons"><img src={linkedin} alt="github" /></a>
            <a href="https://github.com/ahirdman" target="_blank" rel="noreferrer" className="profile-icons"><img src={github} alt="github" /></a>
          </div>
          <div classsName="profile">
            <img className="profile-image" src={joan} alt="joan" />
            <h4 className="profile-name">Joan</h4>
            <a href="https://www.linkedin.com/in/joangerard/" target="_blank" rel="noreferrer" className="profile-icons"><img src={linkedin} alt="github" /></a>
            <a href="https://github.com/joan-gerard" target="_blank" rel="noreferrer" className="profile-icons"><img src={github} alt="github" /></a>
          </div>
        </section>
      </article>
    </section>
  </main>
);

export default About;
