import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { MessageIn, MessageTool, MessageAssistant, MessageDefault, HumanInput, Loading } from ".";
import { chatHistoryAtom, isLoadingAtom } from "../atoms";

function ChatOutput() {
  const [ chatHistory ] = useAtom(chatHistoryAtom);
  const [ isLoading ] = useAtom(isLoadingAtom);
  console.log(chatHistory);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        const e = entries[0];

        const parentElement = e.target.parentElement;
        const elementHeight = e.contentRect.height;

        if (elementHeight > parentElement.clientHeight) {
          parentElement.scrollTop = e.target.scrollHeight;
        }
      });
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }

  }, []);

  return (
    <Box ref={containerRef} fontSize="sm">
      {chatHistory.map((msg) => {
        switch (msg.type) {
          case "in":
            return <MessageIn key={msg.timestamp} message={msg.message} />;
          case "tool_call":
            if (!msg.content) {
              // If no message, there's nothing to render
              return null;
            }
            return <MessageTool key={msg.timestamp} message={msg.content} toolName={msg.tool_name} artifact={msg.artifact} />;
          case "update":
            return <MessageAssistant key={msg.timestamp} message={msg.content} />;
          case "human_input":
            return <HumanInput key={msg.timestamp} message={msg.question} artifact={msg.artifact} options={msg.options} />;
          default:
            return <MessageDefault key={msg.timestamp} type={msg.type} message={JSON.stringify(msg)} />;
        }
      })}
      { isLoading && <Loading />}
    </Box>
  );
}

export default ChatOutput;
