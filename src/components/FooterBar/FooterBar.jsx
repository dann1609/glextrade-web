import React from 'react';
import i18n from 'i18next';

import './FooterBar.scss';

function FooterBar() {
  return (
    <footer className="footer">
      <div className="footer-content">{i18n.t('ALL_CONTACTS')}</div>
      <div className="footer-content">{i18n.t('COPYRIGHT')}</div>
    </footer>
  );
}

export default FooterBar;
