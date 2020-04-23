import React from 'react';
import i18n from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';

import './About.scss';

function MemberCard(member) {
  return (
    <div className="member-container">
      <img src={member.url} alt="Avatar" className="member-image" />
      <div className="member-overlay">
        <h2 className="member-name">{member.name}</h2>
        <h4 className="member-position">{member.position}</h4>
        <p className="member-paragraph">{member.paragraph}</p>
        <div className="member-icons-container">
          <a className="linkedin-icon" target="_blank" href={member.linkedinLink}>
        <FontAwesomeIcon  icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </div>
  );
}

function about() {
  const members = [
    {
      url: require('../../assets/images/CLlinas-profile.jpg'),
      name: 'Carlos Llinas',
      position: i18n.t('CL_POSITION'),
      paragraph: i18n.t('CL_PARAGRAPH'),
      linkedinLink: 'https://www.linkedin.com/in/carlosllinas1/',
    },
    {
      url: require('../../assets/images/DPadilla-profile.jpg'),
      name: 'Daniel Padilla',
      position: i18n.t('DP_POSITION'),
      paragraph: i18n.t('DP_PARAGRAPH'),
      linkedinLink: 'https://www.linkedin.com/in/danielpadillap/',
    },
  ];

  return (
    <div className="about">
      <section className="about-1">
        <h1 className="about-1-title">{i18n.t('ABOUT_TITLE_1')}</h1>
        <p className="about-1-paragraph">{i18n.t('ABOUT_PARAGRAPH_1')}</p>
      </section>
      <section className="about-2">
        <h1 className="about-2-title">{i18n.t('ABOUT_TITLE_2')}</h1>
        <p className="about-2-paragraph">{i18n.t('ABOUT_PARAGRAPH_2')}</p>
        <div className="members-container">
          {
            members.map(MemberCard)
              }
        </div>
      </section>
    </div>
  );
}

export default about;
