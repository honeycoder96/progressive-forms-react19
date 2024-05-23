import { useState, startTransition } from 'react';
import { simulateBotResponse } from './helpers';
import './App.css';

function StartTransitionForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      event.preventDefault();

      setInput('');
      setIsLoading(true); // Add this line

      try {
        // Simulate bot response
        const newMessages = await simulateBotResponse(input, messages);

        // setting state based on server response
        setMessages(newMessages);
      } catch (error) {
        setError(error as any);
      }
      setIsLoading(false);
    });
  };

  // we will loose the pending state behaviour
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
