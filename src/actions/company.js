import CompanyApi from '../api/companyApi';

export async function getCompanies() {
  return CompanyApi.listCompanies();
}
