const NotificationApi = {
  listNotifications: (Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/notifications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
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
  setAllSeenNotifications: (Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/notifications`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
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

export default NotificationApi;
