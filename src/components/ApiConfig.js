import React, { useState, useEffect } from 'react';

const ApiConfig = ({ config, onConfigChange }) => {
  const [localConfig, setLocalConfig] = useState({
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    apiKey: '',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 1000,
    stream: true,
    ...config
  });


  useEffect(() => {
    const savedConfig = localStorage.getItem('openai-config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      delete parsed.apiKey; // Don't load saved API key for security
      setLocalConfig(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;
    
    if (name === 'temperature') {
      newValue = parseFloat(value);
    } else if (name === 'maxTokens') {
      newValue = parseInt(value);
    } else if (name === 'model') {
      // Trim whitespace and ensure model name is not empty
      newValue = value.trim();
      console.log(`[DEBUG] Model name changed to: "${newValue}"`);
    } else {
      newValue = value;
    }
    
    setLocalConfig(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!localConfig.model || localConfig.model.trim() === '') {
      alert('Please enter a model name');
      return;
    }
    
    if (!localConfig.apiKey || localConfig.apiKey.trim() === '') {
      alert('Please enter an API key');
      return;
    }
    
    const configToSave = { ...localConfig };
    delete configToSave.apiKey; // Don't save API key to localStorage
    localStorage.setItem('openai-config', JSON.stringify(configToSave));
    onConfigChange(localConfig);
    console.log(`[DEBUG] Configuration saved with model: "${localConfig.model}"`);
    alert('Configuration saved!');
  };

  return (
    <div className="config-form">
      <h2>API Configuration</h2>
      
      <div className="form-group">
        <label htmlFor="apiUrl">API URL:</label>
        <input
          type="url"
          id="apiUrl"
          name="apiUrl"
          value={localConfig.apiUrl}
          onChange={handleChange}
          placeholder="https://api.openai.com/v1/chat/completions"
        />
      </div>

      <div className="form-group">
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="password"
          id="apiKey"
          name="apiKey"
          value={localConfig.apiKey}
          onChange={handleChange}
          placeholder="sk-..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          name="model"
          value={localConfig.model}
          onChange={handleChange}
          placeholder="Enter model name (e.g., gpt-3.5-turbo, gpt-4, claude-3-sonnet)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="temperature">
          Temperature: <span className="range-value">{localConfig.temperature}</span>
        </label>
        <input
          type="range"
          id="temperature"
          name="temperature"
          min="0"
          max="2"
          step="0.1"
          value={localConfig.temperature}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="maxTokens">
          Max Tokens: <span className="range-value">{localConfig.maxTokens}</span>
        </label>
        <input
          type="range"
          id="maxTokens"
          name="maxTokens"
          min="100"
          max="4000"
          step="100"
          value={localConfig.maxTokens}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="stream">
          <input
            type="checkbox"
            id="stream"
            name="stream"
            checked={localConfig.stream}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, stream: e.target.checked }))}
          />
          Enable Streaming
        </label>
      </div>

      <button className="save-config-button" onClick={handleSave}>
        Save Configuration
      </button>
    </div>
  );
};

export default ApiConfig;