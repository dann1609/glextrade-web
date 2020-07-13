import React from 'react';
import i18n from 'i18next';

import './FooterBar.scss';

function VerticalDivider() { return <div className="vertical-divider" />; }

function FooterBar() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-text">{i18n.t('COLOMBIA_ADDRESS')}</div>
          <VerticalDivider />
          <div className="footer-text">{i18n.t('COLOMBIA_PHONE')}</div>
          <VerticalDivider />
          <div className="footer-text">{i18n.t('COLOMBIA_EMAIL')}</div>
        </div>
        <div className="footer-content">
          <div className="footer-text">{i18n.t('MIAMI_ADDRESS')}</div>
          <div className="footer-text" />
          <div className="footer-text" />
        </div>
        <div className="footer-content">{i18n.t('COPYRIGHT')}</div>
      </div>
    </footer>
  );
}

export default FooterBar;
