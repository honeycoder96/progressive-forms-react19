import { useState, useActionState, useOptimistic } from 'react';

import './App.css';

function UseOptimisticForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);
  const [input, setInput] = useState('');
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

  const [error, submitAction, isPending] = useActionState<string, null>(
    // @ts-ignore
    async (previousState, newName) => {
      setInput('');
      try {
        // Simulate bot response
        await simulateBotResponse();
      } catch (error) {
        return error;
      }
      return null; // value of state can be returned from here
    },
    null //state initial value
  );

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

  // we will loose the pending state, because we are not using the startTransition we created
  return (
    <>
      <div className="messages">
        {optimisticMessages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form
        action={() => {
          setOptimisticMessages((messages) => [
            ...messages,
            { text: input, sender: 'user' },
          ]);
          submitAction();
        }}
        className="input-area"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type a message"
          required
        />
        <button type="submit">
          {' '}
          <>{isPending ? 'Sending...' : 'Send'}</>
        </button>
        {error}
      </form>
    </>
  );
}

export default UseOptimisticForm;
