import { useState } from "react";

function useChat() {
  const [chatHistory, setChatHistory] = useState([]);

  const addPrompt = (promt) => {
    setChatHistory([
      ...chatHistory,
      {
        type: "in",
        message: promt,
        timestamp: Date.now()
      }
    ]);

    fetch("https://api.zeno.ds.io/stream", {
      method: "POST",
      headers:{"content-type": "application/json"},
      body: JSON.stringify({ query: promt })
    }).then(async (response) => {
      const utf8Decoder = new TextDecoder("utf-8");
      const reader = response.body.getReader();
      let { value: chunk, done: readerDone } = await reader.read();
      chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";

      let re = /\r\n|\n|\r/gm;
      let messages = "";

      for (;;) {
        messages += chunk;

        let result = re.exec(messages);
        if (result) {
          // if messages contains a line break, add the last message to the chat history
          const message = {
            ...JSON.parse(messages.substring(0, result.index)),
            timestamp: Date.now()
          };
          setChatHistory(prev => ([ ...prev, message ]));
          messages = messages.substring(result.index + 2);
        }

        if (readerDone) {
          break;
        }

        // Read next chunk
        ({ value: chunk, done: readerDone } = await reader.read());
        chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";
      }
    });
  };

  return {
    addPrompt,
    chatHistory
  };
}

export default useChat;
