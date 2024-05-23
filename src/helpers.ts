export const simulateBotResponse = (input: string, messages: { text: string; sender: string; }[]) => {
    return new Promise<{ text: string; sender: string; }[]>((resolve) => {
      setTimeout(() => {
        const newMessages = [
          ...messages,
          { text: input, sender: 'user' },
          { text: 'Hello, user!', sender: 'bot' },
        ];
        resolve(newMessages);
      }, 3000);
    });
  };