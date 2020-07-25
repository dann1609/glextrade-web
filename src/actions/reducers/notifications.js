import { notificationsType } from '../../reducers/notificationsReducer';

export const setNotificationsList = (notificationsList) => ({
  type: notificationsType.SET_NOTIFICATIONS_LIST,
  notificationsList,
});

export const setNewNotifications = (newNotifications) => ({
  type: notificationsType.SET_NEW_NOTIFICATIONS,
  newNotifications,
});

export const addNewNotification = () => ({
  type: notificationsType.ADD_NEW_NOTIFICATIONS,
});
