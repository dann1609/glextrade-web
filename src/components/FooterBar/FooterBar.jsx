import React from 'react';
import i18n from 'i18next';

import './FooterBar.scss';

function FooterBar() {
  return (
    <footer>
      <div className="footer-content">{i18n.t('ALL_CONTACTS')}</div>
      <div>{i18n.t('COPYRIGHT')}</div>
    </footer>
  );
}

export default FooterBar;
