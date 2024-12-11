import T from "prop-types";
import { Box } from "@chakra-ui/react";
import Markdown from "react-markdown";

function MessageAssistant({ message }) {
  return (
    <Box mb="4" p="2" bgColor="gray.50" borderRadius="4px">
      <Markdown>{message}</Markdown>
    </Box>
  );
}

MessageAssistant.propTypes = {
  message: T.string.isRequired
};

export default MessageAssistant;
