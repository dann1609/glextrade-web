import CompanyApi from '../api/companyApi';

// eslint-disable-next-line import/prefer-default-export
export async function getCompanies() {
  return CompanyApi.listCompanies();
}
