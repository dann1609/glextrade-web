import CompanyApi from '../api/companyApi';
import { dispatch, getAuthorization, getState } from '../config/store';
import { setSession } from './reducers/session';
import S3Api from '../api/s3Api';

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

export async function removeProfileVideo() {
  await updateCompany({
    videoUrl: null,
  });
}

export async function uploadExtraPicture(query) {
  const { session } = getState();
  const { name, type, file } = query;

  const signS3Response = await S3Api.signS3({
    fileName: name,
    fileType: type,
  });

  if (signS3Response.success) {
    const { signedRequest } = signS3Response;

    const uploadS3Response = await S3Api.uploadS3Image({
      file,
      signedRequest,
      fileName: name,
      fileType: type,
    });

    if (uploadS3Response.success) {
      const companyUpdateResponse = await CompanyApi.updateExtraPicture(signS3Response, null, getAuthorization());

      if (!companyUpdateResponse.error) {
        session.user.company = companyUpdateResponse;
        dispatch(setSession(session));
      }
    }
  }
  return null;
}

export async function removeExtraPicture(position) {
  const { session } = getState();

  const companyUpdateResponse = await CompanyApi.updateExtraPicture({}, position, getAuthorization());

  if (!companyUpdateResponse.error) {
    session.user.company = companyUpdateResponse;
    dispatch(setSession(session));
  }
  return null;
}
