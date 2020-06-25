import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Chat.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';
import IndividualChat from './IndividualChat';
import ChatItem from './ChatItem';
import { onMessageReceived } from '../../actions/messages';
import { dispatch } from '../../config/store';
import { setActiveChat } from '../../actions/reducers/chat';
import { refreshUser } from '../../actions/user';
import propTypes from '../../tools/propTypes';

function Chat(props) {
  const { session, chat, socket } = props;
  const { user } = session;
  const { company } = user || {};
  const { network } = company || {};

  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    socket.emit('connect company', {
      company,
    });
    socket.on('msg', (data) => {
      onMessageReceived(data);
    });
  }, [company?._id]);

  const toggleChat = () => {
    refreshUser();
    setChatOpen(!chatOpen);
  };

  const renderChatListContainer = () => {
    const chatList = network.reduce((accumulativeChatList, connection) => {
      if (connection?.relation?.chatRoom) {
        const { chatRoom } = connection.relation;

        chatRoom.company = connection.company;
        chatRoom.newMessages = [];
        accumulativeChatList.push(connection.relation.chatRoom);
      }
      return accumulativeChatList;
    }, []);

    if (chatList.length > 0) {
      return chatList.map((chatItem) => (
        <ChatItem
          name={chatItem.company.name}
          image={chatItem.company.profileUrl}
          lastMessage={chatItem.lastMessage}
          onClick={() => dispatch(setActiveChat(chatItem))}
        />
      ));
    }
    return <h4 className="chat-no-messages">No Messages</h4>;
  };

  const renderIndividualChats = () => {
    const individualChat = chat.activeChat;
    if (individualChat) {
      return (
        <IndividualChat
          socket={socket}
          ownCompany={company}
          chat={individualChat}
          title={individualChat.company.name}
          image={individualChat.company.profileUrl}
          onClose={() => dispatch(setActiveChat(null))}
        />
      );
    }

    return null;
  };

  if (!session._id) { return null; }
  return (
    <div className="chat-container">
      {
              renderIndividualChats()
          }

      <div className="chat-menu-container">
        <div className="chat-name-container" onClick={toggleChat} role="button" tabIndex="0">
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

Chat.propTypes = {
  session: propTypes.session,
  chat: PropTypes.shape({
    activeChat: propTypes.chat,
  }),
  socket: propTypes.socket.isRequired,
};

Chat.defaultProps = {
  session: null,
  chat: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
  chat: state.chat,
});

export default connect(mapStateToProps)(Chat);
