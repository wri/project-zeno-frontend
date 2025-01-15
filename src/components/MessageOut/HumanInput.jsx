
import T from "prop-types";
import { Button, List } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { addPrompt, confirmedLocationAtom, highlightedLocationAtom } from "../../atoms";
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
  const submit = useSetAtom(addPrompt);
  const confirmLocation = useSetAtom(confirmedLocationAtom);
  const setHighlightedLocation = useSetAtom(highlightedLocationAtom);

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
                  submit({ query: `${index}`, queryType: "human_input" });
                  confirmLocation(feature);
                }}
                onMouseEnter={() => setHighlightedLocation(feature.properties.name)}
                onMouseLeave={() => setHighlightedLocation(null)}
                _hover={{ bg: "pink.500" }}
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
