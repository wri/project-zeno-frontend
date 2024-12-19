import T from "prop-types";
import { Box } from "@chakra-ui/react";

function MessageIn({ message }) {
  return (
    <Box mb="4" p="2" borderRadius="md" border="1px solid" borderColor="blackAlpha.200">
      {message}
    </Box>
  );
}

MessageIn.propTypes = {
  message: T.string.isRequired
};

export default MessageIn;
