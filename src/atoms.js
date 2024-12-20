import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";

export const mapLayersAtom = atom([]);
export const highlightedLayerAtom = atom();
export const confirmedLocationAtom = atom();
export const chatHistoryAtom = atom([]);
export const sessionIdAtom = atom(uuidv4());
export const isLoadingAtom = atom(false);
export const chartDataAtom = atom();

function makeInputMessage(query) {
  return {
    type: "in",
    message: query,
    timestamp: Date.now()
  };
}

export const addPrompt = atom(null, (get, set, promt) => {
  const { queryType, query } = promt;

  if (queryType === "query") {
    set(chatHistoryAtom, (prev => [...prev, makeInputMessage(query)]));
  }

  let queryUrl = "https://api.zeno.ds.io/stream";
  if (import.meta.env.VITE_MOCK_QUERIES === "true") {
    queryUrl = "/stream";
  }

  set(isLoadingAtom, true);
  fetch(queryUrl, {
    method: "POST",
    headers:{"content-type": "application/json"},
    body: JSON.stringify({ query, query_type: queryType, thread_id: get(sessionIdAtom) })
  }).then(async (response) => {
    const utf8Decoder = new TextDecoder("utf-8");
    const reader = response.body.getReader();
    let { value: chunk, done: readerDone } = await reader.read();
    chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";

    let buffer = ""; // Accumulate partial chunks

    while (!readerDone) {
      buffer += chunk; // Append current chunk to buffer

      let lineBreakIndex;
      while ((lineBreakIndex = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, lineBreakIndex).trim(); // Extract the line
        buffer = buffer.slice(lineBreakIndex + 1); // Remove processed line

        if (line) {
          try {
            const message = {
              ...JSON.parse(line),
              timestamp: Date.now()
            };
            set(chatHistoryAtom, (prev) => [...prev, message]);
          } catch (err) {
            console.error("Failed to parse line", line, err);
          }
        }
      }

      // Read next chunk
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";
    }

    // Handle any remaining data in the buffer
    if (buffer.trim()) {
      try {
        const message = {
          ...JSON.parse(buffer),
          timestamp: Date.now()
        };
        set(chatHistoryAtom, (prev) => [...prev, message]);
      } catch (err) {
        console.error("Failed to parse final buffer", buffer, err);
      }
    }
  })
  .finally(() => set(isLoadingAtom, false));
});
