import React, { useState, useEffect } from 'react';

import './Chat.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';

function ChatItem(props) {
  const { onClick } = props;

  return (
    <div className="chat-item-container" onClick={onClick}>
      <img src={defaultImage} alt="Avatar" className="chat-item-image" />
      <div className="chat-item-text-container">
        <h5 className="chat-item-company-name">Nombre de la empresa</h5>
        <h6 className="chat-item-message">ultimo mensaje ...</h6>
      </div>
    </div>
  );
}

function IndividualChat(props) {
  const { onClose } = props;

  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const closeChat = () => {
    onClose();
  };

  return (
    <div className="chat-individual-container">
      <div className="chat-name-container" onClick={toggleChat}>
        <img src={defaultImage} alt="Avatar" className="chat-image" />
        <h4 className="chat-title">Chat</h4>
        <span className="chat-close" onClick={closeChat}>&times;</span>
      </div>
      <div className={`chat-list-container ${chatOpen ? 'chat-list-container-open' : ''}`} />
    </div>
  );
}

function Chat(props) {
  const [chatOpen, setChatOpen] = useState(false);
  const [individualChatList, setIndividualChatList] = useState([]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const renderChatListContainer = () => {
    if (true) {
      return [{}, {}, {}, {}, {}, {}, {}, {}, {}].map((chat) => (
        <ChatItem onClick={() => setIndividualChatList([{}])} />
      ));
    }
    return <h4 className="chat-no-messages">No Messages</h4>;
  };

  const renderIndividualChats = () => individualChatList.map((chat) => <IndividualChat onClose={() => setIndividualChatList([])} />);

  return (
    <div className="chat-container">
      {
              renderIndividualChats()
          }

      <div className="chat-menu-container">
        <div className="chat-name-container" onClick={toggleChat}>
          <img src={defaultImage} alt="Avatar" className="chat-image" />
          <h4 className="chat-title">Chat</h4>
        </div>
        <div className={`chat-list-container ${chatOpen ? 'chat-list-container-open' : ''}`}>
          {renderChatListContainer()}
        </div>
      </div>
    </div>
  );
}

export default Chat;
