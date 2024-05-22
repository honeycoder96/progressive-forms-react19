import { useState, useTransition } from 'react';
import './App.css';

function UseTransitionForm() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

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

      try {
        // Simulate bot response
        await simulateBotResponse();
      } catch (error) {
        setError(error);
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
