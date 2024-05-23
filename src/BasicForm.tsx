import { useState } from 'react';
import { simulateBotResponse } from './helpers';
import './App.css';

function BasicForm() {
  // state for managing thr messages
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);

  // state for managing the input value
  const [input, setInput] = useState('');

  // state for managing the loading state while API call is processing
  const [isLoading, setIsLoading] = useState(false);

  // state for error handling
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setInput('');
    setIsLoading(true);

    try {
      // Simulate bot response
      const newMessages = await simulateBotResponse(input, messages);

      // setting state based on server response
      setMessages(newMessages);
    } catch (error) {
      setError(error as string);
    }
    setIsLoading(false);
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
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        {error}
      </form>
    </>
  );
}

export default BasicForm;
