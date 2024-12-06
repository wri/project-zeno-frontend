import T from "prop-types";
import { Box } from "@chakra-ui/react";
import { Alert } from "./ui/alert";

function MessageDefault({message, type}) {
  return (
    <Box mb="4" p="2" bgColor="gray.50" borderRadius="4px">
      <Alert status="warning" title={`Unsupported message type "${type}"`} />
      {message}
    </Box>
  );
}

MessageDefault.propTypes = {
  message: T.string.isRequired,
  type: T.string.isRequired
};

export default MessageDefault;
