const CompanyApi = {
  listCompanies: () => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/companies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
  updateCompany: (data, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/companies/my_company`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
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
  updatePreviewVideo: (data, Authorization) => {
    const formData = new FormData();
    formData.append('companyVideo', data);
    return fetch(`${process.env.REACT_APP_API_DOMAIN}/api/companies/update_profile_video`, {
      method: 'POST',
      headers: {
        Authorization,
      },
      mode: 'cors',
      body: formData,
    }).then((response) => response.json())
      .catch((error) => {
        console.error(error);
        return {
          error: {
            message: "Can't reach server",
          },
        };
      });
  },
  updateExtraPicture: (data, position, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/companies/update_extra_picture${position ? `/${position}` : ''}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
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
  getCompanyById: (id, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/companies/${id}?profile_view=true`, {
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
  connect: (id, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/companies/${id}`, {
    method: 'PUT',
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
  disconnect: (id, Authorization) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/companies/${id}`, {
    method: 'DELETE',
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

export default CompanyApi;
