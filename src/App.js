import React, { useState } from 'react';
import ApiConfig from './components/ApiConfig';
import ChatInterface from './components/ChatInterface';

function App() {
  const [config, setConfig] = useState({
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    apiKey: '',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 1000
  });
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ApiConfig config={config} onConfigChange={handleConfigChange} />
      </div>
      <div className="main-content">
        <ChatInterface 
          config={config}
          messages={messages}
          setMessages={setMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}

export default App;