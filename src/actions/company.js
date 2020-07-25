import CompanyApi from '../api/companyApi';
import { dispatch, getAuthorization, getState } from '../config/store';
import { setSession } from './reducers/session';

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

export async function updateCompany(data) {
  const { session } = getState();

  const companyUpdateResponse = await CompanyApi.updateCompany(data, getAuthorization());

  if (!companyUpdateResponse.error) {
    session.user.company = companyUpdateResponse;
    dispatch(setSession(session));
  }
}

export async function uploadProfileVideo(query) {
  const { session } = getState();
  const { file } = query;

  const uploadVideoResponse = await CompanyApi.updatePreviewVideo(file, getAuthorization());

  if (!uploadVideoResponse.error) {
    session.user.company = uploadVideoResponse;
    dispatch(setSession(session));
  }
}
