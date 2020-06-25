import MessageApi from '../api/messageApi';
import { dispatch, getState, getAuthorization } from '../config/store';
import { refreshUser } from './user';
import { setActiveChat } from './reducers/chat';


export async function getChatRoom(id) {
  const response = await MessageApi.getMessages(id, getAuthorization());

  return response;
}

export async function sendMessage(id, message) {
  const response = await MessageApi.sendMessage(id, message, getAuthorization());

  refreshUser();

  return response;
}

export async function onMessageReceived(data) {
  const { chat } = getState();

  const individualChat = chat.activeChat;

  if (individualChat?._id !== data._id) {
    dispatch(setActiveChat({ ...data, ...{ newMessages: [] } }));
  } else {
    dispatch(setActiveChat({
      ...data,
      ...{
        newMessages: individualChat.newMessages.concat([{
          message: data.lastMessage,
          owner: data.company._id,
        }]),
      },
    }));
  }
}

export async function updateMyMessage(data) {
  const { chat } = getState();

  const individualChat = chat.activeChat;

  dispatch(setActiveChat({
    ...individualChat,
    ...{
      newMessages: individualChat.newMessages.concat([{
        message: data.lastMessage,
        owner: data.company._id,
      }]),
    },
  }));
}
