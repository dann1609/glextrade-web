const StorageApi = {
  saveSession(session) {
    if (true) {
      sessionStorage.setItem('session', JSON.stringify(session));
    } else {
      localStorage.setItem('session', JSON.stringify(session));
    }
  },
  restoreSession() {
    const temporalSession = JSON.parse(sessionStorage.getItem('session'));
    const localSession = JSON.parse(localStorage.getItem('session'));

    if (temporalSession && temporalSession.token) {
      return temporalSession;
    }
    if (localSession && localSession.token) {
      return localSession;
    }

    return null;
  },
};

export default StorageApi;
