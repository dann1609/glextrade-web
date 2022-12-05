import i18n from 'i18next';
import en from './en';
import es from './es';


i18n
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en,
      es,
    },

    // special options for react-i18next
    // learn more: https://react.i18next.com/components/i18next-instance
    react: {
      wait: true,
    },
  });

//i18n.changeLanguage('es');

export default i18n;
