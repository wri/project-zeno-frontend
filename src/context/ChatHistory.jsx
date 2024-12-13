import { createContext, useContext, useState } from "react";
import T from "prop-types";
import { useSetAtom } from "jotai";

import { mapLayersAtom } from "../atoms";
import apiResponse from "./apiResponse";

function getResponseMessage(response) {
  const contextLayer = response.find(({ tool_name }) => tool_name === "context-layer-tool");
  const location = response.find(({ tool_name }) => tool_name === "location-tool");
  const msg = [{
    type: "text",
    text: `Here's what I found:

  - Using context Layer: ${contextLayer.message}
  - Dist Alerts in ${location.artifact.features[0].properties.name}
  `
    }, {
      type: "tool_confirm",
      name: "Shall I add these layers to the map?"
    },
  ];

  return {
    type: "assistant",
    message: msg,
    timestamp: Date.now()
  };
}

const ChatHistoryContext = createContext();

export function ChatHistoryProvider({ children }) {
  const [chatHistory, setChatHistory] = useState([]);
  const setMapLayers = useSetAtom(mapLayersAtom);

  const addPrompt = (promt) => {
    setChatHistory([
      ...chatHistory,
      {
        type: "in",
        message: promt,
        timestamp: Date.now()
      }
    ]);

    setTimeout(() => {
      const msg = getResponseMessage(apiResponse);
      setChatHistory(prev => ([
        ...prev,
        msg
      ]));
    }, 500);

    // fetch("https://api.zeno.ds.io/stream", {
    //   method: "POST",
    //   headers:{"content-type": "application/json"},
    //   body: JSON.stringify({ query: promt })
    // }).then(async (response) => {
    //   const utf8Decoder = new TextDecoder("utf-8");
    //   const reader = response.body.getReader();
    //   let { value: chunk, done: readerDone } = await reader.read();
    //   chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";

    //   let re = /\r\n|\n|\r/gm;
    //   let messages = "";

    //   for (;;) {
    //     messages += chunk;

    //     let result = re.exec(messages);
    //     if (result) {
    //       // if messages contains a line break, add the last message to the chat history
    //       const message = {
    //         ...JSON.parse(messages.substring(0, result.index)),
    //         timestamp: Date.now()
    //       };
    //       setChatHistory(prev => ([ ...prev, message ]));
    //       messages = messages.substring(result.index + 2);
    //     }

    //     if (readerDone) {
    //       break;
    //     }

    //     // Read next chunk
    //     ({ value: chunk, done: readerDone } = await reader.read());
    //     chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";
    //   }
    // });
  };

  const confirm = () => {

    setMapLayers(
      apiResponse
        .filter(({ artifact }) => !!artifact)
        .map(({ artifact }) => artifact)
    );

    setChatHistory(prev => ([
      ...prev,
      {
        type: "assistant",
        message: "Excellent, I've added these layers to the map.",
        timestamp: Date.now()
      }
    ]));
  };

  const contextValue = {
    chatHistory,
    addPrompt,
    confirm
  };

  return (
    <ChatHistoryContext.Provider value={contextValue}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

ChatHistoryProvider.propTypes = {
  children: T.node.isRequired,
};

export function useChat() {
  const { chatHistory, addPrompt, confirm } = useContext(ChatHistoryContext);

  return { chatHistory, addPrompt, confirm };
}
