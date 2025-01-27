import { useState } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { MdChevronRight } from "react-icons/md";
import { useSetAtom } from "jotai";
import { addPrompt } from "../atoms";

function ChatInput() {
  const [ inputValue, setInputValue ] = useState("");

  const submit = useSetAtom(addPrompt);

  const submitPrompt = () => {
    submit({ query: inputValue, queryType: "query" });
    setInputValue("");
  };

  const handleKeyUp = (e) => {
    if(e.keyCode === 13 && inputValue?.trim().length > 0) {
      e.preventDefault();
      submitPrompt();
    }
  };

  return (
    <Box position="relative">
      <Textarea
        aria-label="Ask a question"
        placeholder="Ask a question"
        fontSize="sm"
        autoresize
        maxH="10lh" 
        pr="12"
        shadow="md"
        border="0"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <Button
        position="absolute"
        right="2"
        bottom="0"
        transform="translateY(-50%)"
        padding="0"
        {...(inputValue?.trim().length == 0 && { disabled: true })}
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
