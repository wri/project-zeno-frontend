import { atom } from "jotai";

export const mapLayersAtom = atom([]);
export const chatHistoryAtom = atom([]);

function makeInputMessage(query) {
  return {
    type: "in",
    message: query,
    timestamp: Date.now()
  };
}

export const addPrompt = atom(null, (get, set, query) => {
  set(chatHistoryAtom, (prev => [...prev, makeInputMessage(query)]));

  fetch("https://api.zeno.ds.io/stream", {
    method: "POST",
    headers:{"content-type": "application/json"},
    body: JSON.stringify({ query })
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
        set(chatHistoryAtom, (prev => [...prev, message]));
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
});
