import CompanyApi from '../api/companyApi';
import { getAuthorization } from '../config/store';

// eslint-disable-next-line import/prefer-default-export
export async function getCompanies() {
  return CompanyApi.listCompanies();
}

export async function getCompanyById(id) {
  return CompanyApi.getCompanyById(id, getAuthorization());
}

export async function connect(id) {
  return CompanyApi.connect(id, getAuthorization());
}

export async function disconnect(id) {
  return CompanyApi.disconnect(id, getAuthorization());
}
