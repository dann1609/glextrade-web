import NotificationApi from '../api/notificationApi';
import { getAuthorization } from '../config/store';

export async function getNotifications() {
  return NotificationApi.listNotifications(getAuthorization());
}

export async function setSeenNotifications() {
  return NotificationApi.setAllSeenNotifications(getAuthorization());
}
