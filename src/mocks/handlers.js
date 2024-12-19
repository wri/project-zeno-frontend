import { http, HttpResponse } from "msw";
import response1 from "./response_01.jsonl?raw";
import response2 from "./response_02.jsonl?raw";

function validLines(response) {
  return response
    .split("\n")
    .map((line) => {
      try {
        JSON.parse(line);
        return line;
      } catch (err) {
        // if the line is not valid JSON, ignore it
        return err ? null : line;
      }
    })
    .filter(Boolean)
    .join("\r\n");
}

const handlers = [
  http.post("/stream", async ({ request }) => {
    const query = await request.json();

    switch(query.query_type) {
      case "query":
        return HttpResponse.text(validLines(response1), { headers: { "Content-Type": "application/x-ndjson" } });
      case "human_input":
        return HttpResponse.text(validLines(response2), { headers: { "Content-Type": "application/x-ndjson" } });
      default:
        return HttpResponse.text("invalid query", { headers: { "Content-Type": "application/x-ndjson" } });
    }
  })
];

export default handlers;
