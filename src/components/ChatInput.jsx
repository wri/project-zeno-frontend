import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useChat } from "../context/ChatHistory";

function ChatInput() {
  const { addPrompt } = useChat();
  const [ inputValue, setInputValue ] = useState("");

  const handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      addPrompt(inputValue);
      setInputValue("");
    }
  };

  return (
    <Input
      aria-label="Ask a question"
      placeholder="Ask a question"
      bgColor="white"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
}

export default ChatInput;
