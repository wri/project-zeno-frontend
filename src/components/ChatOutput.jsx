import { useEffect, useRef } from "react";
import { Box, List } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Alert } from "./ui/alert";

import { MessageIn, MessageTool, MessageAssistant, MessageDefault, LocationSelect, Loading } from ".";
import { chatHistoryAtom, isLoadingAtom, currentAppTypeAtom } from "../atoms";
import PersonaSelect from "./MessageOut/PersonaSelect";

function ChatOutput() {
  const [chatHistory] = useAtom(chatHistoryAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const containerRef = useRef();
  const [appType] = useAtom(currentAppTypeAtom);

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

  const message = appType === "alerting" ? `
  Hi! I'm Land & Carbon Lab's alert explorer. I can help you find and investigate disturbances in your area of interest using the Land Disturbance Alert Classification System and other contextual data. 
  \nStart by asking me what I can do.
  ` : `
  Hi! I'm Land & Carbon Lab's monitoring assistant. I can help you answer queries about Key Biodiversity Areas, provide insights, and help you set up a nature monitoring dashboard.`;

  return (
    <Box ref={containerRef} fontSize="sm">
      <MessageAssistant message={message} />
      {appType === "monitoring" && <PersonaSelect /> /* only show persona select in monitoring application */}
      <List.Root p={0} listStyleType="none">
        {chatHistory.map((msg) => (
          <List.Item key={`${msg.type}-${msg.timestamp}`}>
            {(() => {
              switch (msg.type) {
                case "in":
                  return <MessageIn message={msg.message} />;
                case "tool_call":
                  if (!msg.content) {
                    // If no message, there's nothing to render
                    return null;
                  }
                  return <MessageTool message={msg.content} toolName={msg.tool_name} artifact={msg.artifact} />;
                case "interrupted":
                  {
                    let options;
                    try {
                      options = JSON.parse(msg.payload);
                      // eslint-disable-next-line no-unused-vars
                    } catch (e) {
                      return (
                        <Alert status="error" title="Error">
                          There was a problem processing your request. Please try again or try another prompt;
                        </Alert>
                      );
                    }
                    return <LocationSelect type={msg.type} options={options} />;
                  }
                case "update":
                  if (msg.summary && msg.summary === true) {
                    const messageObject = {
                      insights: [
                        {
                          type: "text",
                          title: "Summary",
                          data: msg.content
                        }
                      ]
                    };
                    return <MessageTool message={JSON.stringify(messageObject)} toolName="kba-insights-tool" />;
                  }
                  return <MessageAssistant message={msg.content} />;
                default:
                  return <MessageDefault type={msg.type} message={JSON.stringify(msg)} />;
              }
            })()}
          </List.Item>
        ))}
      </List.Root>
      {isLoading && <Loading />}
    </Box>
  );
}

export default ChatOutput;
