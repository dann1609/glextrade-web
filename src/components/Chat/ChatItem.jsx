import React from 'react';
import PropTypes from 'prop-types';

import './ChatItem.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';

function ChatItem(props) {
  const {
    onClick, lastMessage, name, image,
  } = props;

  return (
    <div className="chat-item-container" onClick={onClick} role="button" tabIndex="0">
      <img src={image || defaultImage} alt="Avatar" className="chat-item-image" />
      <div className="chat-item-text-container">
        <h5 className="chat-item-company-name">{name}</h5>
        <h6 className="chat-item-message">{lastMessage}</h6>
      </div>
    </div>
  );
}

ChatItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  lastMessage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.node,
};

ChatItem.defaultProps = {
  image: null,
};

export default ChatItem;
