const MessageApi = {
  getMessages: (id, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/messages/${id}`, {
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
  sendMessage: (id, message, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/messages/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
    body: JSON.stringify({ message }),
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

export default MessageApi;
