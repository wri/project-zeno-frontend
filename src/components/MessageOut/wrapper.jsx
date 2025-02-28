import T from "prop-types";
import { Box } from "@chakra-ui/react";
import { LclLogo } from "..";

function MessageOutWrapper({ children }) {
  return (
    <Box display="flex" gap="2" alignItems="flex-start">
      <Box bg="bg.subtle" px="11px" py="10px" borderRadius="full">
        <LclLogo width="10" avatarOnly fill="var(--chakra-colors-bg-inverted)" />
      </Box>
      <Box mb="4" p="2" bgColor="bg.subtle" borderRadius="md" flexGrow="1" shadow="md" flexGrow="1" overflow="hidden">
        {children}
      </Box>
    </Box>
  );
}

MessageOutWrapper.propTypes = {
  children: T.node.isRequired
};

export default MessageOutWrapper;
