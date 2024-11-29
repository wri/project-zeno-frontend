import { useState } from "react";
import T from "prop-types";
import { Input } from "@chakra-ui/react";

function ChatInput({ addPrompt }) {
  const [inputValue, setInputValue ] = useState("");

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

ChatInput.propTypes = {
  addPrompt: T.func.isRequired
};

export default ChatInput;
