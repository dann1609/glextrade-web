import UsersApi from '../api/usersApi';
import { dispatch, getState } from '../config/store';
import { setSession } from './reducers/session';
import S3Api from '../api/s3Api';

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

export async function uploadPicture(query) {
  const { name, type, file } = query;

  const signS3Response = await S3Api.signS3({
    fileName: name,
    fileType: type,
  });

  console.log(signS3Response);

  if (signS3Response.success) {
    const { signedRequest } = signS3Response;

    const uploadS3Response = await S3Api.uploadS3Image({
      file,
      signedRequest,
      fileName: name,
      fileType: type,
    });

    console.log(uploadS3Response);

    if (uploadS3Response.success) {
      const { session } = getState();

      const companyUpdateResponse = await UsersApi.updateCompany({
        token: session.token,
        profileUrl: signS3Response.url,
      });
      console.log(companyUpdateResponse);

      session.user.company = companyUpdateResponse;
      dispatch(setSession(session));
    }
  }
}

export async function uploadCoverPicture(query) {
  const { name, type, file } = query;

  const signS3Response = await S3Api.signS3({
    fileName: name,
    fileType: type,
  });

  console.log(signS3Response);

  if (signS3Response.success) {
    const { signedRequest } = signS3Response;

    const uploadS3Response = await S3Api.uploadS3Image({
      file,
      signedRequest,
      fileName: name,
      fileType: type,
    });

    console.log(uploadS3Response);

    if (uploadS3Response.success) {
      const { session } = getState();

      const companyUpdateResponse = await UsersApi.updateCompany({
        token: session.token,
        coverUrl: signS3Response.url,
      });
      console.log(companyUpdateResponse);

      session.user.company = companyUpdateResponse;
      dispatch(setSession(session));
    }
  }
}

export async function uploadVideo(query) {
  const { file } = query;

  const uploadS3Response = await S3Api.uploadS3Video(file);

  if (uploadS3Response.success) {
    const { session } = getState();

    const companyUpdateResponse = await UsersApi.updateCompany({
      token: session.token,
      videoUrl: uploadS3Response.url,
    });

    session.user.company = companyUpdateResponse;
    dispatch(setSession(session));
  }
}
