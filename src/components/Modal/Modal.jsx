import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

function Modal(props) {
  const {
    visible, close, message, actions,
  } = props;

  const closeModal = () => {
    close();
  };

  const renderActions = () => actions.map((action) => <button className="modal-action" type="button" onClick={action.onClick}>{action.name}</button>);

  return (
    <div className={`modal-container ${visible ? 'visible' : ''}`} onClick={closeModal}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p className="modal-message">{message}</p>
        <div className="modal-action-container">
          {renderActions()}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  message: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string,
      action: PropTypes.func,
    },
  )),
};

Modal.defaultProps = {
  visible: false,
  close: () => {},
  message: 'Some text in the Modal..',
  actions: [],

};

export default Modal;
