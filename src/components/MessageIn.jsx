import T from "prop-types";
import { Box } from "@chakra-ui/react";

function MessageIn({ message }) {
  return (
    <Box mb="4" p="2" bgColor="blue.700" color="white" borderRadius="4px">
      {message}
    </Box>
  );
}

MessageIn.propTypes = {
  message: T.string.isRequired
};

export default MessageIn;
