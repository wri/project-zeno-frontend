import T from "prop-types";
import { Box, Button } from "@chakra-ui/react";
import Markdown from "react-markdown";

import { useChat } from "../context/ChatHistory";

function MessageAssistant({ message }) {
  const { addPrompt, confirm } = useChat();

  if (typeof message === "string" || message instanceof String) {
    return (
      <Box mb="4" p="2" bgColor="gray.50" borderRadius="4px">
        <Markdown>{message}</Markdown>
      </Box>
    );
  } else {
    return (
      <Box mb="4" p="2" bgColor="gray.50" borderRadius="4px">
        {message.map((messagePart) => {
          const { index, type } = messagePart;
          if (type === "text") {
            return <Markdown key={index}>{messagePart.text}</Markdown>;
          }
          if (type === "tool_use") {
            const { query } = JSON.parse(messagePart.partial_json);
            return <Button size="xs" mt="4" key={index} onClick={() => addPrompt(query)}>{messagePart.name}</Button>;
          }
          if (type === "tool_confirm") {
            return (
              <>
                <Markdown>{messagePart.name}</Markdown>
                <Button size="xs" mt="4" onClick={confirm}>Yes</Button>
              </>
            );
          }
        })}
      </Box>
    );
  }
}

const TextMessageType = T.shape({
  index: T.number.isRequired,
  type: "text",
  text: T.string.isRequired
});

const ToolUseMessageType = T.shape({
  id: T.string.isRequired,
  index: T.number.isRequired,
  input: T.object,
  name: T.string.isRequired,
  partial_json: T.string.isRequired,
  type: "tool_use"
});

const ToolConfirm = T.shape({
  name: T.string.isRequired,
  type: "tool_confirm"
});

MessageAssistant.propTypes = {
  message: T.oneOfType([
    T.string,
    T.arrayOf(T.oneOfType([
      TextMessageType,
      ToolUseMessageType,
      ToolConfirm
    ]))
  ]).isRequired
};

export default MessageAssistant;
