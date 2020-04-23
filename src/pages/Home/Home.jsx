import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faPlayCircle, faHandshake } from '@fortawesome/free-solid-svg-icons';
import i18n from 'i18next';
import { Link } from 'react-router-dom';

import './Home.scss';

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

function Home() {
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
        <div className="home-3-sub-title-animated-container">
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-1">{i18n.t('HOME_TEXT_ANIMATED_1')}</h2>
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-2">{i18n.t('HOME_TEXT_ANIMATED_2')}</h2>
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-3">{i18n.t('HOME_TEXT_ANIMATED_3')}</h2>
          <h2 className="home-3-sub-title home-3-sub-title-animated animated-4">{i18n.t('HOME_TEXT_ANIMATED_4')}</h2>
          <div className="animated-caret" />
        </div>
        <div className="home-separator" />
        <Link to="/sign_up">
          <h2 className="home-3-sub-title fast-register-link">{i18n.t('REGISTER_YOUR_COMPANY_REDIRECT')}</h2>
        </Link>
      </section>
    </div>
  );
}

export default Home;
