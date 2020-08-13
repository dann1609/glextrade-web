import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Companies.scss';
import i18n from 'i18next';
import { getCompanies } from '../../actions/company';
import propTypes from '../../tools/propTypes';
import CompanyCardProfile from '../../components/CompanyCardProfile/CompanyCardProfile';
import Modal from '../../components/Modal/Modal';

function Companies(props) {
  const { session } = props;

  const [page] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [modal, setModal] = useState({
    visible: false,
  });

  useEffect(() => {
    getCompanies().then((response) => {
      if (!response.error) {
        setCompanies(response.companies);
      }
    });
  }, [page]);

  const goToCompanyProfile = (id) => {
    if (session.token) {
      props.history.push(`companies/${id}`);
    } else {
      registerToSeeDialog();
    }
  };

  const renderList = () => companies.map(
    (item) => (
      <CompanyCardProfile
        key={item._id}
        company={item}
        onClick={() => goToCompanyProfile(item._id)}
      />
    ),
  );

  const registerToSeeDialog = () => {
    setModal({
      visible: true,
      message: 'Para ver el perfil y conectar con las compañias debes estar registrado.\nDeseas registrarte?',
      actions: [{
        name: 'Registrarme',
        onClick: () => props.history.push('sign_up'),
      },
      {
        name: 'Iniciar Sesion',
        onClick: () => props.history.push('sign_in'),
      }],
    });
  };

  return (
    <div className="companies">
      <section className="companies-1">
        <p className="companies-1-paragraph">{i18n.t('COMPANIES_PARAGRAPH_1')}</p>
      </section>
      <section className="company-list">
        {renderList()}
      </section>
      <Modal
        visible={modal.visible}
        message={modal.message}
        close={() => setModal({ visible: false })}
        actions={modal.actions}
      />
    </div>
  );
}

Companies.propTypes = {
  ...propTypes.ScreenProptypes,
  session: propTypes.session,
};

Companies.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Companies);
