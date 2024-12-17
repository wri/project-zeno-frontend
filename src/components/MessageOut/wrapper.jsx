import T from "prop-types";
import { Box } from "@chakra-ui/react";
import { LclLogo } from "..";

function MessageOutWrapper({ children }) {
  return (
    <Box display="flex" gap="2" alignItems="flex-start">
      <Box shadow="sm" px="11px" py="10px" borderRadius="full">
        <LclLogo />
      </Box>
      <Box mb="4" p="2" bgColor="gray.100" borderRadius="md" shadow="md">
        {children}
      </Box>
    </Box>
  );
}

MessageOutWrapper.propTypes = {
  children: T.node.isRequired
};

export default MessageOutWrapper;
