import React from 'react';

import './NotificationCard.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';
import propTypes from '../../tools/propTypes';

const getMessage = (type, data) => {
  switch (type) {
    case 'SEEN_PROFILE':
      return `${data.company.name} ha visto tu perfil`;
    default:
      return 'No message';
  }
};

const NotificationCard = (props) => {
  const { event } = props;
  const { type, data } = event;
  const { profileUrl } = event.data.company;

  const goToEvent = (id) => {
    props.history.push(`companies/${id}`);
  };

  const onClick = (event, data) => {
    switch (type) {
      case 'SEEN_PROFILE':
        return props.history.push(`companies/${data.company._id}`);
      default:
        return 'No message';
    }
  };

  return (
    <div className="notification-container" onClick={() => onClick(event, data)}>
      <img src={profileUrl || defaultImage} alt="Avatar" className="event-image" />
      <p className="event-message">
        {getMessage(type, data)}
      </p>
    </div>
  );
};

NotificationCard.propTypes = {
  history: propTypes.ReactRouterHistory.isRequired,
};

export default NotificationCard;
