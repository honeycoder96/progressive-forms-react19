import { useState } from 'react';
import { simulateBotResponse } from './helpers';
import { useFormStatus } from 'react-dom';

import './App.css';

function UseFormSTatusForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string>('');

  // Action do not receive event as param
  const submitAction = async () => {
    setInput('');

    try {
      // Simulate bot response
      const newMessages = await simulateBotResponse(input, messages);

      // setting state based on server response
      setMessages(newMessages);
    } catch (error) {
      setError(error as string);
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
        <button type="submit">
          {' '}
          <Pending>Test </Pending>
        </button>
        {error}
      </form>
    </>
  );
}

export default UseFormSTatusForm;

// more common in design systems
// @ts-ignore added children to show how element can be passed as child, currently not being used
function Pending({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  let { pending, data, method, action } = useFormStatus();

  return <>{pending ? 'Sending...' : 'Send'}</>;
}
