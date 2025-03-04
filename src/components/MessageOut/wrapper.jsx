import T from "prop-types";
import { Box } from "@chakra-ui/react";
import { LclLogo } from "..";

function MessageOutWrapper({ children }) {
  return (
    <Box mb="4" p="2" bgColor="bg.muted" borderRadius="md" borderWidth={1} borderColor="border" flexGrow="1" overflow="hidden">
      <Box float="left" mr="1" mt="0.5">
        <LclLogo width={12} avatarOnly fill="var(--chakra-colors-bg-inverted)" float="left" />
      </Box>
      {children}
    </Box>
  );
}

MessageOutWrapper.propTypes = {
  children: T.node.isRequired
};

export default MessageOutWrapper;
