import CompanyApi from '../api/companyApi';
import { getAuthorization } from '../config/store';

// eslint-disable-next-line import/prefer-default-export
export async function getCompanies() {
  return CompanyApi.listCompanies();
}

export async function getCompanyById(id) {
  return CompanyApi.getCompanyById(id, getAuthorization());
}
