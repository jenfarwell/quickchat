# Inference Testing Chat Application

A frontend-only React application that provides a chat interface for OpenAI API endpoints.

## Features

- **API Configuration**: Configure API URL, API key, model, temperature, and max tokens
- **Chat Interface**: Clean, responsive chat interface with message history
- **Local Storage**: Saves configuration and chat history locally
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Responsive Design**: Works on desktop and mobile devices
- **Multiple Models**: Support for various OpenAI models (GPT-3.5, GPT-4, etc.)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Configure your OpenAI API settings:
   - Enter your API URL (default: https://api.openai.com/v1/chat/completions)
   - Enter your OpenAI API key
   - Select your preferred model
   - Adjust temperature and max tokens as needed
   - Click "Save Configuration"

4. Start chatting!

## Configuration Options

- **API URL**: The endpoint URL for OpenAI API (or compatible APIs)
- **API Key**: Your OpenAI API key (stored only in memory, not persisted)
- **Model**: Choose from various OpenAI models
- **Temperature**: Controls randomness (0.0 to 2.0)
- **Max Tokens**: Maximum tokens in response (100 to 4000)

## Usage

1. **Sending Messages**: Type your message in the input field and press Enter or click Send
2. **Clearing Chat**: Use the "Clear Chat History" button to start fresh
3. **Configuration**: Settings are saved to localStorage (except API key)
4. **Responsive**: Works on both desktop and mobile devices

## Security Notes

- API keys are stored only in memory and not persisted to localStorage
- All processing is done client-side
- No data is sent to any server except the configured OpenAI API endpoint

## Troubleshooting

### Common Issues

1. **"Please configure your API key"**: Enter your OpenAI API key in the configuration panel
2. **Network errors**: Check your internet connection and API URL
3. **401 Unauthorized**: Verify your API key is correct
4. **Rate limiting**: You may need to wait before making more requests

### Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

### Project Structure

```
src/
├── components/
│   ├── ApiConfig.js      # Configuration form
│   ├── ChatInterface.js  # Main chat functionality
│   ├── LoadingSpinner.js # Loading indicator
│   └── Message.js        # Individual message component
├── styles/
│   └── App.css          # All styling
├── App.js               # Main app component
└── index.js            # Entry point
```

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## License

This project is open source and available under the MIT License.
