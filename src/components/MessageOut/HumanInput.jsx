
import T from "prop-types";
import { Button, List } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import {sessionIdAtom} from "../../atoms";
import MessageOutWrapper from "./wrapper";

/**
 *
 * Human Input component
 * Takes options and presents them to the user
 * Once an option is selected, create a POST to the server
 * with the selected option
 *
 */
function HumanInput({ message, options, artifact }) {
  const queryUrl = import.meta.env.MOCK_QUERIES === "true" ? "/stream" : "https://api.zeno.ds.io/stream";
  const sessionId = useAtomValue(sessionIdAtom);
  return (
    <MessageOutWrapper>
      {message}
      <List.Root listStyle="none" pl="0">
        {options.map((option, index) => {
          const feature = artifact.features.find((f) => f.id === `${option}`);

          return (
            <List.Item key={option}>
              <Button
                size="xs"
                mb="2"
                type="button"
                colorPalette="blue"
                borderRadius="full"
                onClick={() => {
                  fetch(queryUrl, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ query: `${index}`, query_type: "human_input", thread_id: sessionId })
                  });
                }}
              >
                {feature.properties.name}
              </Button>
            </List.Item>
          );
        })}
      </List.Root>
    </MessageOutWrapper>
  );
}

HumanInput.propTypes = {
  message: T.string.isRequired,
  options: T.arrayOf(T.string || T.number).isRequired,
  artifact: T.object.isRequired
};

export default HumanInput;
