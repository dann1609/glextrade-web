import UsersApi from '../api/usersApi';
import { dispatch, getAuthorization } from '../config/store';
import { setSession, setUser } from './reducers/session';
import S3Api from '../api/s3Api';
import StorageApi from '../api/StorageApi';
import { updateCompany } from './company';

export async function signUp(query) {
  const {
    name, country, industry, type, email, password, phone, website,
  } = query || {};

  const response = await UsersApi.registerUser({
    name,
    country,
    industry,
    type,
    email,
    password,
    phone,
    website,
  });

  if (response.token) {
    dispatch(setSession(response));
    return response;
  }

  return response;
}

export async function signIn(query) {
  const { email, password } = query || {};

  const response = await UsersApi.loginUser({
    email,
    password,
  });

  if (response.token) {
    dispatch(setSession(response));
    return response;
  }

  return response;
}

export async function refreshUser() {
  const response = await UsersApi.refreshUser(getAuthorization());

  if (response._id) {
    dispatch(setUser(response));
  }
}

export async function signOut() {
  StorageApi.saveSession({});
  dispatch(setSession({}));
}

export async function uploadPicture(query) {
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
      updateCompany({
        profileUrl: signS3Response.url,
      });
    }
  }
}

export async function uploadCoverPicture(query) {
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
      updateCompany({
        coverUrl: signS3Response.url,
      });
    }
  }
}
