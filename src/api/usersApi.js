
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
      console.error(error);
      return {
        error: {
          message: "Can't reach server",
        },
      };
    }),
  refreshUser: (Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
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
};

export default UsersApi;
