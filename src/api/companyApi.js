const CompanyApi = {
  listCompanies: () => fetch(`${process.env.REACT_APP_API_DOMAIN}/companies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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

export default CompanyApi;
