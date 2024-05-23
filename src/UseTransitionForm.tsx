import { useState, useTransition } from 'react';
import { simulateBotResponse } from './helpers';
import './App.css';

function UseTransitionForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      event.preventDefault();

      setInput('');

      try {
        // Simulate bot response
        const newMessages = await simulateBotResponse(input, messages);

        // setting state based on server response
        setMessages(newMessages);
      } catch (error) {
        setError(error as string);
      }
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
        <button type="submit" disabled={isPending}>
          {' '}
          {/* Add this line */}
          {isPending ? 'Sending...' : 'Send'} {/* Add this line */}
        </button>
        {error}
      </form>
    </>
  );
}

export default UseTransitionForm;
