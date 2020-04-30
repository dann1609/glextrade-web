export const sessionType = {
  SET_SESSION: 'SET_SESSION',
  CLEAR_SESSION: 'CLEAR_SESSION',
};

export const session = (state = {}, action) => {
  switch (action.type) {
    case sessionType.SET_SESSION:
      return { ...state, ...action.session };
    case sessionType.CLEAR_SESSION:
      return {};
    default:
      return state;
  }
};
