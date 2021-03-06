
const S3Api = {
  signS3: (data) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/s3/sign_s3`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.error(error);
      return {
        error: {
          message: "Can't reach server",
        },
      };
    }),
  uploadS3Image: (data) => fetch(data.signedRequest, {
    method: 'PUT',
    headers: {
      'Content-Type': data.fileType,
    },
    mode: 'cors',
    body: data.file,
  }).then((response) => {
    if (response.status === 200) {
      return {
        success: true,
      };
    }
    return response;
  })
    .catch((error) => {
      console.error(error);
      return {
        error: {
          message: "Can't reach server",
        },
      };
    }),
};

export default S3Api;
