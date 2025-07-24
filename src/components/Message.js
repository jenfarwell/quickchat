import React from 'react';

const Message = ({ message }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${message.role}`}>
      <div className="message-content">
        <div>{message.content}</div>
        <div className="message-timestamp">
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;