import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { addPrompt } from "../atoms";

function ChatInput() {
  const [ inputValue, setInputValue ] = useState("");

  const submit = useSetAtom(addPrompt);

  const handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      submit(inputValue);
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
