import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import LoadingSpinner from './LoadingSpinner';

const ChatInterface = ({ config, messages, setMessages, isLoading, setIsLoading }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [setMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    if (!config.apiKey) {
      setError('Please configure your API key in the settings');
      return;
    }

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: config.temperature,
          max_tokens: config.maxTokens
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toISOString()
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      localStorage.setItem('chat-messages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error sending message:', error);
      setError(`Failed to send message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h1>OpenAI Chat</h1>
      </div>
      
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        
        {isLoading && <LoadingSpinner />}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container">
        <textarea
          className="input-field"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows="1"
          disabled={isLoading}
        />
        <button 
          className="send-button" 
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
        >
          Send
        </button>
      </div>
      
      <button className="clear-chat-button" onClick={clearChat}>
        Clear Chat History
      </button>
    </div>
  );
};

export default ChatInterface;