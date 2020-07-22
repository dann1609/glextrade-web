import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faPlayCircle, faHandshake } from '@fortawesome/free-solid-svg-icons';
import i18n from 'i18next';
import Particles from 'react-particles-js';

import './Home.scss';
import propTypes from '../../tools/propTypes';

const particles = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

function subSection(subsection) {
  return (
    <div className="home-sub-section">
      <FontAwesomeIcon className="sub-home-icon" icon={subsection.icon} />
      <div className="sub-home-text-container">
        <h2 className="sub-home-text-title">{subsection.title}</h2>
        <p className="sub-home-text-body">{subsection.body}</p>
      </div>
    </div>
  );
}

function renderSubsections() {
  const subsections = [
    {
      icon: faIndustry,
      title: i18n.t('SUB_HOME_TITLE_1'),
      body: i18n.t('SUB_HOME_BODY_1'),
    },
    {
      icon: faPlayCircle,
      title: i18n.t('SUB_HOME_TITLE_2'),
      body: i18n.t('SUB_HOME_BODY_2'),
    },
    {
      icon: faHandshake,
      title: i18n.t('SUB_HOME_TITLE_3'),
      body: i18n.t('SUB_HOME_BODY_3'),
    },
  ];

  return (
    <div className="home-sub-sections-container">
      {
                subsections.map(subSection)
            }
    </div>
  );
}

function Home(props) {
  const goToRegister = () => {
    props.history.push('sign_up');
  };

  return (
    <div className="home">
      <section className="home-1">
        <h1>{i18n.t('HOME_TITLE_1')}</h1>
      </section>
      <section className="home-2">
        <h2>{i18n.t('HOME_TITLE_2').toUpperCase()}</h2>
        {renderSubsections()}
      </section>
      <section className="home-3">
        <div className="home-3-background" />
        <Particles className="home-3-particles" params={particles} />
        <div className="home-3-sub-title-animated-container">
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-1">{i18n.t('HOME_TEXT_ANIMATED_1')}</h2>
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-2">{i18n.t('HOME_TEXT_ANIMATED_2')}</h2>
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-3">{i18n.t('HOME_TEXT_ANIMATED_3')}</h2>
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-4">{i18n.t('HOME_TEXT_ANIMATED_4')}</h2>
          <div className="animated-caret" />
        </div>
        <div className="home-separator" />
        <h2 className="home-3-sub-title fast-register-label">{i18n.t('REGISTER_YOUR_COMPANY_REDIRECT')}</h2>
        <button onClick={goToRegister} className="home-3-to-register" type="button">REGISTRAR MI EMPRESA</button>
      </section>
    </div>
  );
}

Home.propTypes = {
  ...propTypes.ScreenProptypes,
};

export default Home;
