import T from "prop-types";
import Markdown from "react-markdown";
import { useSetAtom, useAtomValue } from "jotai";
import { addPrompt } from "../../atoms";
import MessageOutWrapper from "./wrapper";
import QueryButton from "./QueryButton";
import AudioPlayButton from "../AudioButton";
import { showAudioButtonsAtom } from "../../atoms";

function MessageAssistant({ message }) {
  const submit = useSetAtom(addPrompt);
  const showAudioButtons = useAtomValue(showAudioButtonsAtom);

  const audioUrl = `https://api.zeno.ds.io/stream/voice?query=${encodeURIComponent(
    message
  )}`;

  if (typeof message === "string" || message instanceof String) {
    return (
      <MessageOutWrapper
      style={{
        flexDirection: "column",
        display: "flex",
      }}
      >
        <Markdown>{message}</Markdown>
        {
          showAudioButtons && 
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
        <AudioPlayButton audioUrl={audioUrl} />
        </div>
        }
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
            if (messagePart?.partial_json != undefined) {
            const { query } = JSON.parse(messagePart.partial_json);
            return (
              <QueryButton
                key={index}
                mt="2"
                clickHandler={() => submit(query)}
              >
                {messagePart.name}
              </QueryButton>
            );
          }}
        })}
      </MessageOutWrapper>
    );
  }
}

const TextMessageType = T.shape({
  index: T.number,
  type: "text",
  text: T.string.isRequired
});

const ToolUseMessageType = T.shape({
  id: T.string.isRequired,
  index: T.number,
  input: T.object,
  name: T.string.isRequired,
  partial_json: T.string,
  type: "tool_use"
});

MessageAssistant.propTypes = {
  message: T.oneOfType([
    T.string,
    T.arrayOf(T.oneOfType([
      TextMessageType,
      ToolUseMessageType,
      T.object
    ]))
  ]).isRequired
};

export default MessageAssistant;
