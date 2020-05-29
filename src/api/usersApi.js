
const UsersApi = {
  registerUser: (data) => fetch(`${process.env.REACT_APP_API_DOMAIN}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.log('api error');
      console.error(error);
      return {
        error: {
          message: "Can't reach server",
        },
      };
    }),
  loginUser: (data) => fetch(`${process.env.REACT_APP_API_DOMAIN}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.log('api error');
      console.error(error);
      return {
        error: {
          message: "Can't reach server",
        },
      };
    }),
  updateCompany: (data) => fetch(`${process.env.REACT_APP_API_DOMAIN}/companies/my_company`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: data.token,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.log('api error');
      console.error(error);
      return {
        error: {
          message: "Can't reach server",
        },
      };
    }),
};

export default UsersApi;
