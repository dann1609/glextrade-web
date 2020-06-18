export const chatType = {
  SET_CHAT_LIST: 'SET_CHAT_LIST',
  SET_ACTIVE_CHAT: 'SET_ACTIVE_CHAT',
};


export const chat = (state = {
  chatList: [],
}, action) => {
  switch (action.type) {
    case chatType.SET_CHAT_LIST:
      return { ...state, ...{ chatList: action.chatList } };
    case chatType.SET_ACTIVE_CHAT:
      return { ...state, ...{ activeChat: action.activeChat } };
    default:
      return state;
  }
};
