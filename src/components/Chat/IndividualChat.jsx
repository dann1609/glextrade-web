import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getChatRoom, sendMessage, updateMyMessage } from '../../actions/messages';
import defaultImage from '../../assets/images/default_avatar.jpg';
import Button from '../Button/Button';

import './IndividualChat.scss';
import propTypes from '../../tools/propTypes';

function IndividualChat(props) {
  const {
    onClose, title, image, chat, ownCompany, socket,
  } = props;

  const [chatOpen, setChatOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastMessageRef, setLastMessageRef] = useState(null);

  useEffect(() => {
    getChatRoom(chat._id).then((response) => {
      if (response._id) {
        setMessages(response.data);
      }
    });
  }, [chat._id]);

  const scrollToBottom = () => {
    if (lastMessageRef) {
      lastMessageRef.scrollIntoView({ bahaviour: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

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
    socket.emit('msg', {
      chatId: chat._id,
      company: chat.company,
      message,
      owner: ownCompany,
    });
    updateMyMessage({
      company: ownCompany,
      lastMessage: message,
      _id: chat._id,
    });
    setMessage('');
  };

  const renderMessages = () => messages.concat(chat.newMessages)
    .map((chatMessage, index, messageList) => {
      const prevMessageOwner = messageList[index - 1]?.owner;
      const nextMessageOwner = messageList[index + 1]?.owner;

      const messageImage = chatMessage.owner === chat.company._id
        ? chat.company.profileUrl : ownCompany.profileUrl;

      return (
        <div className={`message-container ${nextMessageOwner === chatMessage.owner ? 'head-message-container' : ''} ${prevMessageOwner === chatMessage.owner ? 'foot-message-container' : ''}`}>
          <img src={messageImage || defaultImage} alt="Avatar" className="message-image" />
          <p className="message">{chatMessage.message}</p>
        </div>
      );
    });

  return (
    <div className="chat-individual-container">
      <div className="chat-name-container" onClick={toggleChat} role="button" tabIndex="0">
        <img src={image || defaultImage} alt="Avatar" className="chat-image" />
        <h4 className="chat-title">{title}</h4>
        <span className="chat-close" onClick={closeChat} role="button" tabIndex="0">&times;</span>
      </div>
      <div className={`chat-list-container ${chatOpen ? 'chat-list-container-open' : ''}`}>
        <div className="message-area">
          {renderMessages()}
          <div className="last-message-reference" ref={(ref) => { setLastMessageRef(ref); }} />
        </div>
        <div className="input-container">
          <textarea className="chat-input" value={message} onChange={handleChange} />
          <Button className="send" type="button" onClick={send}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}

IndividualChat.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.node,
  chat: propTypes.chat.isRequired,
  socket: propTypes.socket.isRequired,
  ownCompany: propTypes.company.isRequired,
};

IndividualChat.defaultProps = {
  image: null,
};

export default IndividualChat;
