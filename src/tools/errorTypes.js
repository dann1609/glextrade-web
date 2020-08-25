import i18n from 'i18next';

export const getErrorMessage = (error) => {
  switch (error) {
    case 'Company already registered':
      return i18n.t('COMPANY_ALREADY_REGISTERED');
    case 'User already registered':
      return i18n.t('USER_ALREADY_REGISTERED');
  }
};
