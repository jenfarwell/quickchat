import React from 'react';

const Message = ({ message, onDelete }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`message ${message.role}`}>
      <div className="message-content">
        <div className="message-text">
          {message.content}
          {message.isStreaming && (
            <span className="typing-indicator">▋</span>
          )}
        </div>
        <div className="message-timestamp">
          {formatTimestamp(message.timestamp)}
          {message.isStreaming && <span className="streaming-indicator"> (typing...)</span>}
          {!message.isStreaming && (
            <button
              className="delete-message-button"
              onClick={onDelete}
              title="Delete message"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;