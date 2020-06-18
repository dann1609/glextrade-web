import React, { useState, useEffect } from 'react';

import './Chat.scss';
import { connect } from 'react-redux';
import defaultImage from '../../assets/images/default_avatar.jpg';
import Button from '../Button/Button';
import { getChatRoom, sendMessage } from '../../actions/messages';
import { dispatch } from '../../config/store';
import { setActiveChat } from '../../actions/reducers/chat';

function ChatItem(props) {
  const {
    onClick, lastMessage, name, image,
  } = props;

  return (
    <div className="chat-item-container" onClick={onClick}>
      <img src={image || defaultImage} alt="Avatar" className="chat-item-image" />
      <div className="chat-item-text-container">
        <h5 className="chat-item-company-name">{name}</h5>
        <h6 className="chat-item-message">{lastMessage}</h6>
      </div>
    </div>
  );
}

function IndividualChat(props) {
  const {
    onClose, title, image, chat, ownCompany,
  } = props;

  console.log(chat);

  const [chatOpen, setChatOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('chatEfect');
    getChatRoom(chat._id).then((response) => {
      if (response._id) {
        setMessages(response.data);
      }
    });
  }, chat._id);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const closeChat = () => {
    onClose();
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const send = () => {
    sendMessage(chat._id, message);
    setMessage('');
  };

  const renderMessages = () => messages.map((message) => {
    const image = message.owner == chat.company._id ? chat.company.profileUrl : ownCompany.profileUrl;

    return (
      <div className="message-container">
        <img src={image || defaultImage} alt="Avatar" className="message-image" />
        <p className="message">{message.message}</p>
      </div>
    );
  });

  console.log('messages', messages);

  return (
    <div className="chat-individual-container">
      <div className="chat-name-container" onClick={toggleChat}>
        <img src={image || defaultImage} alt="Avatar" className="chat-image" />
        <h4 className="chat-title">{title}</h4>
        <span className="chat-close" onClick={closeChat}>&times;</span>
      </div>
      <div className={`chat-list-container ${chatOpen ? 'chat-list-container-open' : ''}`}>
        <div className="message-area">
          {renderMessages()}
        </div>
        <div className="input-container">
          <textarea className="chat-input" value={message} onChange={handleChange} />
          <Button className="send" type="button" onClick={send}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}

function Chat(props) {
  const { session, chat } = props;
  const { user } = session;
  const { company } = user || {};
  const { network } = company || {};

  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const renderChatListContainer = () => {
    const chatList = network.reduce((chatList, connection) => {
      if (connection?.relation?.chatRoom) {
        const { chatRoom } = connection.relation;

        chatRoom.company = connection.company;
        chatList.push(connection.relation.chatRoom);
      }
      return chatList;
    }, []);

    if (chatList.length > 0) {
      return chatList.map((chat) => (
        <ChatItem
          name={chat.company.name}
          image={chat.company.profileUrl}
          lastMessage={chat.lastMessage}
          onClick={() => dispatch(setActiveChat(chat))}
        />
      ));
    }
    return <h4 className="chat-no-messages">No Messages</h4>;
  };

  const renderIndividualChats = () => {
    const individualChat = chat.activeChat;
    console.log('individual', individualChat);
    if (individualChat) {
      return (
        <IndividualChat
          ownCompany={company}
          chat={individualChat}
          title={individualChat.company.name}
          image={individualChat.company.profileUrl}
          onClose={() => dispatch(setActiveChat(null))}
        />
      );
    }
  };

  if (!session._id) { return null; }
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

const mapStateToProps = (state) => ({
  session: state.session,
  chat: state.chat,
});

export default connect(mapStateToProps)(Chat);
