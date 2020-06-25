import React from 'react';
import i18n from 'i18next';

import './FooterBar.scss';

function FooterBar() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">{i18n.t('COLOMBIA_CONTACT')}</div>
        <div className="footer-content">{i18n.t('MIAMI_CONTACT')}</div>
        <div className="footer-content">{i18n.t('COPYRIGHT')}</div>
      </div>
    </footer>
  );
}

export default FooterBar;
