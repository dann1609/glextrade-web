import React, { useState, useEffect } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './Notifications.scss';
import i18n from 'i18next';
import propTypes from '../../tools/propTypes';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { deleteNotification, getNotifications, setSeenNotifications } from '../../actions/notification';


function Notifications(props) {
  const { session } = props;

  const [page] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then((response) => {
      if (!response.error) {
        setNotifications(response.notifications.reverse());
        setSeenNotifications();
      }
    });
  }, [page]);

  if (!session.token) {
    return <Redirect to="/sign_in" />;
  }

  const removeNotification = (id) => {
    deleteNotification(id).then((response) => {
      if (!response.error) {
        setNotifications(response.notifications.reverse());
      }
    });
  };

  const renderList = () => notifications.map(
    (item) => (
      <NotificationCard
        key={item._id}
        event={item}
        history={props.history}
        removeNotification={() => removeNotification(item._id)}
      />
    ),
  );

  return (
    <div className="notifications">
      <section className="notifications-1">
        <p className="notifications-1-paragraph">{i18n.t(notifications.length ? 'NOTIFICATIONS_PARAGRAPH_1' : 'NOTIFICATIONS_PARAGRAPH_0')}</p>
      </section>
      <section className="notification-list">
        {renderList()}
      </section>
    </div>
  );
}

Notifications.propTypes = {
  ...propTypes.ScreenProptypes,
  session: propTypes.session,
};

Notifications.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Notifications);
