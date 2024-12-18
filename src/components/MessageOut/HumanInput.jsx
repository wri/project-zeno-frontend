
import T from "prop-types";
import MessageOutWrapper from "./wrapper";
import {sessionIdAtom} from "../../atoms";
import { useAtomValue } from "jotai";
import { Button } from "@chakra-ui/react";

/**
 * 
 * Human Input component
 * Takes options and presents them to the user
 * Once an option is selected, create a POST to the server
 * with the selected option
 * 
 */
function HumanInput({message, options}) {
  const queryUrl = import.meta.env.MOCK_QUERIES === "true" ? "/stream" : "https://api.zeno.ds.io/stream";
  const sessionId = useAtomValue(sessionIdAtom);
  return (
    <MessageOutWrapper>
      {message}
      <ul>
        {options.map((option, index) => {
          return (
            <li key={option}>
              <Button
                size="xs" 
                mt="4"
                type="button"
                onClick={() => {
                  fetch(queryUrl, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ query: `${index}`, query_type: "human_input", thread_id: sessionId })
                  });
                }}
              >
                {option}
              </Button>
            </li>
          );
        })}
      </ul>
    </MessageOutWrapper>
  );
}

HumanInput.propTypes = {
  message: T.string,
  options: T.arrayOf(T.string || T.number),
};

export default HumanInput;
