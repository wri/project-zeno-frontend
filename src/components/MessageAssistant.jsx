import T from "prop-types";
import { Box, Button } from "@chakra-ui/react";
import Markdown from "react-markdown";

import { useChat } from "../context/ChatHistory";

function MessageAssistant({ message }) {
  const { addPrompt } = useChat();

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
          } else {
            const { query } = JSON.parse(messagePart.partial_json);
            return <Button size="xs" mt="4" key={index} onClick={() => addPrompt(query)}>{messagePart.name}</Button>;
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

MessageAssistant.propTypes = {
  message: T.oneOfType([
    T.string.isRequired,
    T.arrayOf(T.oneOfType([
      TextMessageType,
      ToolUseMessageType
    ])).isRequired
  ])
};

export default MessageAssistant;
