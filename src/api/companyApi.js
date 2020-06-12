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
  updateCompany: (data, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/companies/my_company`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
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
  getCompanyById: (id, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/companies/${id}?profile_view=true`, {
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
  connect: (id, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/companies/${id}`, {
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
  disconnect: (id, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/companies/${id}`, {
    method: 'DELETE',
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

export default CompanyApi;
