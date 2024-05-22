import { useState } from 'react';
import './App.css';

function BasicForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);
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
        resolve(null);
      }, 3000);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setInput('');
    setIsLoading(true);

    try {
      // Simulate bot response
      await simulateBotResponse();
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
          {/* Add this line */}
          {isLoading ? 'Sending...' : 'Send'} {/* Add this line */}
        </button>
        {error}
      </form>
    </>
  );
}

export default BasicForm;
