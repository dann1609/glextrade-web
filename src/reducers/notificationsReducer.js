export const notificationsType = {
  SET_NOTIFICATIONS_LIST: 'SET_NOTIFICATIONS_LIST',
  SET_NEW_NOTIFICATIONS: 'SET_NEW_NOTIFICATIONS',
  ADD_NEW_NOTIFICATIONS: 'ADD_NEW_NOTIFICATIONS',
};


export const notifications = (state = {
  notificationsList: [],
  newNotifications: 0,
}, action) => {
  switch (action.type) {
    case notificationsType.SET_NOTIFICATIONS_LIST:
      return { ...state, ...{ notificationsList: action.notificationsList } };
    case notificationsType.SET_NEW_NOTIFICATIONS:
      return { ...state, ...{ newNotifications: action.newNotifications } };
    case notificationsType.ADD_NEW_NOTIFICATIONS:
      return { ...state, ...{ newNotifications: state.newNotifications + 1 } };
    default:
      return state;
  }
};
