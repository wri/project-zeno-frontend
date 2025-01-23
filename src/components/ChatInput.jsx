import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { MdChevronRight } from "react-icons/md";
import { useAtomValue, useSetAtom } from "jotai";
import { addPrompt, interruptedStateAtom } from "../atoms";

function ChatInput() {
  const [ inputValue, setInputValue ] = useState("");

  const interruptedStateValue = useAtomValue(interruptedStateAtom);

  const submit = useSetAtom(addPrompt);

  const submitPrompt = () => {
    submit({ query: inputValue, queryType: "query" });
    setInputValue("");
  };

  const handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      submitPrompt();
    }
  };

  return (
    <Box position="relative">
      <Input
        aria-label="Ask a question"
        placeholder={interruptedStateValue? "Confirm your location" : "Ask a question"}
        fontSize="sm"
        pr="12"
        shadow="md"
        border="0"
        {...(interruptedStateValue && { disabled: true })}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <Button
        position="absolute"
        right="2"
        top="50%"
        transform="translateY(-50%)"
        padding="0"
        {...(interruptedStateValue && { disabled: true })}
        borderRadius="full"
        colorPalette="blue"
        type="button"
        size="xs"
        onClick={submitPrompt}
      >
        <MdChevronRight />
      </Button>
    </Box>
  );
}

export default ChatInput;
