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

  // Action do not receive event as param
  const submitAction = async () => {
    setInput('');

    try {
      // Simulate bot response
      await simulateBotResponse();
    } catch (error) {
      setError(error);
    }
  };

  // we will loose the pending state, because we are not using the startTransition we created
  return (
    <>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form action={submitAction} className="input-area">
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
