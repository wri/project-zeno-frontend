import { Box} from "@chakra-ui/react";
import Markdown from "react-markdown";
import T from "prop-types";

export default function TextWidget({ data }) {
  return (
    <Box p="6">
      <Markdown>{data}</Markdown>
    </Box>
  );
}

TextWidget.propTypes = {
  data: T.string.isRequired,
};



