
import T from "prop-types";
import { List } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { addPrompt, confirmedLocationAtom, highlightedLayerAtom } from "../../atoms";
import MessageOutWrapper from "./wrapper";
import QueryButton from "./QueryButton";

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
  const setHighlightedLayer = useSetAtom(highlightedLayerAtom);

  return (
    <MessageOutWrapper>
      {message}
      <List.Root listStyle="none" pl="0">
        {options.map((option, index) => {
          const feature = artifact.features.find((f) => f.id === `${option}`);

          return (
            <List.Item key={option} m="0">
              <QueryButton
                clickHandler={() => {
                  submit({ query: `${index}`, queryType: "human_input" });
                  confirmLocation(feature);
                }}
                onMouseEnter={() => setHighlightedLayer(feature.id)}
                onMouseLeave={() => setHighlightedLayer(null)}
                _hover={{ bg: "pink.500" }}
              >
                {feature.properties.name}
              </QueryButton>
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
