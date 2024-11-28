import { useState } from "react";

function useChat() {
  const [chatHistory, setChatHistory] = useState([]);

  const addPrompt = (promt) => {
    setChatHistory([
      ...chatHistory,
      {
        type: "in",
        message: promt,
        timestamp: Date.now()
      }
    ]);
  };

  return {
    addPrompt,
    chatHistory
  };
}

export default useChat;
