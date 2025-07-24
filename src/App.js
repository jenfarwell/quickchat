import React, { useState } from 'react';
import ApiConfig from './components/ApiConfig';
import ChatInterface from './components/ChatInterface';

function App() {
  const [config, setConfig] = useState({
    apiUrl: 'http://localhost:1337/v1/chat/completions',
    apiKey: '',
    model: 'Blackbox:gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000,
    stream: true
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