import { Box, Flex, Text } from "@chakra-ui/react";
import { LclLogo } from ".";
import WRILogo from "./WRIlogo";
import BEFLogo from "./BEFLogo";
import { ColorModeButton } from "./ui/color-mode";

function GlobalHeader() {
  return (
    <Box
      bg="bg.panel"
      shadow="sm"
      px="8"
      py="4"
      display="flex"
      justifyContent="space-between"
    >
      <Flex gap={12} alignItems="center">
        <LclLogo width="80" />
        <Text
          fontFamily="mono"
          fontVariantNumeric="slashed-zero"
          fontFeatureSettings="'ss03'"
          letterSpacing="0.75px"
          fontSize="sm"
          lineHeight="100%"
          textTransform="uppercase"
          fontWeight="500"
          title="Project Zeno"
        >
          Pr0ject <br /> Zen0_
        </Text>
      </Flex>
      <Flex gap={12} alignItems="center">
        <ColorModeButton />
        <a href="https://www.bezosearthfund.org/" target="_blank" rel="noreferrer" title="Bezos Earth Fund Logo">
          <BEFLogo width="92" />
        </a>
        <a href="https://www.wri.org/" target="_blank" rel="noreferrer" title="WRI Logo">
          <WRILogo width="120" />
        </a>
      </Flex>
    </Box>
  );
}
export default GlobalHeader;
