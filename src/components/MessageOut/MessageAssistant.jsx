import T from "prop-types";
import { Button } from "@chakra-ui/react";
import Markdown from "react-markdown";

import { useSetAtom } from "jotai";
import { addPrompt } from "../../atoms";
import MessageOutWrapper from "./wrapper";

function MessageAssistant({ message }) {
  const submit = useSetAtom(addPrompt);

  if (typeof message === "string" || message instanceof String) {
    return (
      <MessageOutWrapper>
        <Markdown>{message}</Markdown>
      </MessageOutWrapper>
    );
  } else {
    return (
      <MessageOutWrapper>
        {message.map((messagePart) => {
          const { index, type } = messagePart;
          if (type === "text") {
            return <Markdown key={index}>{messagePart.text}</Markdown>;
          } else {
            const { query } = JSON.parse(messagePart.partial_json);
            return (
              <Button
                size="xs"
                mt="4"
                key={index}
                onClick={() => submit(query)}
                borderRadius="full"
                colorPalette="blue"
                type="button"
              >
                {messagePart.name}
              </Button>);
          }
        })}
      </MessageOutWrapper>
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
    T.string,
    T.arrayOf(T.oneOfType([
      TextMessageType,
      ToolUseMessageType
    ]))
  ]).isRequired
};

export default MessageAssistant;
