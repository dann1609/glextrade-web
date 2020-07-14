import React from 'react';

import './NotificationCard.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';
import propTypes from '../../tools/propTypes';
import Button from '../Button/Button';
import { connect } from '../../actions/company';

const getMessage = (type, data) => {
  switch (type) {
    case 'SEEN_PROFILE':
      return `${data.company.name} ha visto tu perfil`;
    case 'CONNECTION_REQUEST':
      return `${data.company.name} quiere conectar contigo`;
    case 'CONNECTION_ACCEPTED':
      return `${data.company.name} aceptó tu invitación`;
    default:
      return 'No message';
  }
};

const NotificationCard = (props) => {
  const { event = {}, removeNotification } = props;
  const { type, data } = event;
  const { profileUrl } = event.data.company;

  const acceptConnection = (nativeEvent) => {
    nativeEvent.stopPropagation();
    connect(data.company._id).then((response) => {
      if (!response.error) {
        removeNotification();
        props.history.push(`companies/${data.company._id}`);
      }
    });
  };

  const ignoreConnection = (nativeEvent) => {
    nativeEvent.stopPropagation();
    removeNotification();
  };

  const notificationActions = {
    container: () => {},
  };

  switch (type) {
    case 'CONNECTION_REQUEST':
      notificationActions.acceptAction = acceptConnection;
      notificationActions.acceptMessage = 'Aceptar';
      notificationActions.cancelAction = ignoreConnection;
      notificationActions.cancelMessage = 'Ignorar';
    case 'CONNECTION_ACCEPTED':
    case 'SEEN_PROFILE':
      notificationActions.container = () => props.history.push(`companies/${data.company._id}`);
      break;
    default:
      break;
  }

  return (
    <div className="notification-container" onClick={notificationActions.container} role="button" tabIndex="0">
      <img src={profileUrl || defaultImage} alt="Avatar" className="event-image" />
      <p className="event-message">
        {getMessage(type, data)}
      </p>
      <div className="notification-action-container">
        { notificationActions.acceptAction
        && (
        <Button className="notification-action-accept" type="button" onClick={notificationActions.acceptAction}>
          {notificationActions.acceptMessage}
        </Button>
        )}
        { notificationActions.cancelAction && (
        <Button className="notification-action-cancel" type="button" onClick={notificationActions.cancelAction}>
          {notificationActions.cancelMessage}
        </Button>
        )}
      </div>
    </div>
  );
};

NotificationCard.propTypes = {
  history: propTypes.history.isRequired,
  event: propTypes.event,
};

NotificationCard.defaultProps = {
  event: null,
};

export default NotificationCard;
