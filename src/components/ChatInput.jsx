import { useState } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSetAtom, useAtom } from "jotai";
import { addPrompt, currentUserPersonaAtom, currentAppTypeAtom } from "../atoms";

function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const [userPersona] = useAtom(currentUserPersonaAtom);
  const [appType] = useAtom(currentAppTypeAtom);
  const submit = useSetAtom(addPrompt);

  const submitPrompt = () => {
    submit({ query: inputValue, queryType: "query" });
    setInputValue("");
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && inputValue?.trim().length > 0) {
      e.preventDefault();
      submitPrompt();
    }
  };

  const getInputState = () => {
    // Check for monitoring app without persona
    if (appType === "monitoring" && !userPersona) {
      return {
        disabled: true,
        message: "Please select a persona to continue"
      };
    }

    // Default enabled state
    return {
      disabled: false,
      message: "Ask a question"
    };
  };

  const { disabled, message } = getInputState();
  const isButtonDisabled = disabled || !inputValue?.trim();

  return (
    <Box position="relative" m={0} p={0}>
      <Textarea
        aria-label="Ask a question"
        placeholder={message}
        fontSize="sm"
        autoresize
        maxH="10lh"
        pr="12"
        bg="bg.subtle"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
        disabled={disabled}
      />
      <Button
        position="absolute"
        right="2"
        bottom="0.5"
        transform="translateY(-50%)"
        padding="0"
        borderRadius="full"
        colorPalette="blue"
        _disabled={{
          opacity: 0.75,
        }}
        type="button"
        size="xs"
        onClick={submitPrompt}
        disabled={isButtonDisabled}
      >
        <MdKeyboardArrowUp />
      </Button>
    </Box>
  );
}

export default ChatInput;
