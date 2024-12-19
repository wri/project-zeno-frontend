import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { MdChevronRight } from "react-icons/md";
import { useSetAtom } from "jotai";
import { addPrompt } from "../atoms";

function ChatInput() {
  const [ inputValue, setInputValue ] = useState("");

  const submit = useSetAtom(addPrompt);

  const handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      submit({ query: inputValue, queryType: "query" });
      setInputValue("");
    }
  };

  return (
    <Box position="relative">
      <Input
        aria-label="Ask a question"
        placeholder="Ask a question"
        fontSize="sm"
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
        top="50%"
        transform="translateY(-50%)"
        padding="0"
        borderRadius="full"
        colorPalette="blue"
        type="button"
        size="xs"
        onClick={() => submit({ query: inputValue, queryType: "query" })}
      >
        <MdChevronRight />
      </Button>
    </Box>
  );
}

export default ChatInput;
