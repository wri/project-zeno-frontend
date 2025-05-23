
import T from "prop-types";
import { List } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { addPrompt, confirmLocationAtom, highlightedLocationAtom } from "../../atoms";
import MessageOutWrapper from "./wrapper";
import QueryButton from "./QueryButton";

/**
 *
 * Location Select component
 * Takes options and presents them to the user
 * Once an option is selected, create a POST to the server
 * with the selected option
 *
 */
function LocationSelect({ options }) {
  const submit = useSetAtom(addPrompt);
  const confirmLocation = useSetAtom(confirmLocationAtom);
  const setHighlightedLocation = useSetAtom(highlightedLocationAtom);

  return (
    <MessageOutWrapper>
      Select a location:
      <List.Root listStyle="none" pl="0" display="flex" flexDir="row" flexWrap="wrap" gap="2" my="2">
        {options.map((option, i) => {

          let gid = option[1];
          let name = option[0];

          return (
            <List.Item key={option} m="0">
              <QueryButton
                clickHandler={() => {
                  submit({ query: `${option.join(" ")}`, queryType: "human_input" });
                  confirmLocation(gid);
                }}
                onMouseEnter={() => setHighlightedLocation(gid)}
                onMouseLeave={() => setHighlightedLocation(null)}
              >
                {i + 1}. {name}
              </QueryButton>
            </List.Item>
          );
        })}
      </List.Root>
    </MessageOutWrapper>
  );
}

LocationSelect.propTypes = {
  options: T.arrayOf(T.string || T.number).isRequired,
};

export default LocationSelect;
