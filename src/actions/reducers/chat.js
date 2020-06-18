import { chatType } from '../../reducers/chatReducer';

export const setChatList = (chatList) => ({
  type: chatType.SET_CHAT_LIST,
  chatList,
});

export const setActiveChat = (activeChat) => ({
  type: chatType.SET_ACTIVE_CHAT,
  activeChat,
});
