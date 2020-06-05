import React, { useState, useEffect } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './Notifications.scss';
import i18n from 'i18next';
import propTypes from '../../tools/propTypes';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { getNotifications, setSeenNotifications } from '../../actions/notification';


function Notifications(props) {
  const { session } = props;

  const [page] = useState(0);
  const [notifications, setNotificationss] = useState([]);

  useEffect(() => {
    getNotifications().then((response) => {
      if (!response.error) {
        setNotificationss(response.notifications.reverse());
        setSeenNotifications();
      }
    });
  }, [page]);

  if (!session.token) {
    return <Redirect to="/sign_in" />;
  }

  const renderList = () => notifications.map(
    (item) => (
      <NotificationCard
        key={item._id}
        event={item}
        history={props.history}
      />
    ),
  );

  return (
    <div className="notifications">
      <section className="notifications-1">
        <p className="notifications-1-paragraph">{i18n.t('NOTIFICATIONS_PARAGRAPH_1')}</p>
      </section>
      <section className="notification-list">
        {renderList()}
      </section>
    </div>
  );
}

Notifications.propTypes = {
  session: propTypes.session,
  history: propTypes.ReactRouterHistory.isRequired,
};

Notifications.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Notifications);
