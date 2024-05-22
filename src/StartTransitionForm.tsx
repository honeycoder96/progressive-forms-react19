import { useState, startTransition } from 'react';
import './App.css';

function StartTransitionForm() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const simulateBotResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages([
          ...messages,
          { text: input, sender: 'user' },
          { text: 'Hello, user!', sender: 'bot' },
        ]);
        resolve();
      }, 3000);
    });
  };

  const handleSubmit = async (event) => {
    startTransition(async () => {
      event.preventDefault();

      setInput('');
      setIsLoading(true); // Add this line

      try {
        // Simulate bot response
        await simulateBotResponse();
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type a message"
          required
        />
        <button type="submit" disabled={isLoading}>
          {' '}
          {/* Add this line */}
          {isLoading ? 'Sending...' : 'Send'} {/* Add this line */}
        </button>
        {error}
      </form>
    </>
  );
}

export default StartTransitionForm;
