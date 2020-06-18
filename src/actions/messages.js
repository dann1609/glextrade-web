import MessageApi from '../api/messageApi';
import { dispatch, getAuthorization } from '../config/store';
import { refreshUser } from './user';


export async function getChatRoom(id) {
  const response = await MessageApi.getMessages(id, getAuthorization());
  console.log(response);

  return response;
}

export async function sendMessage(id, message) {
  const response = await MessageApi.sendMessage(id, message, getAuthorization());

  refreshUser();

  return response;
}
