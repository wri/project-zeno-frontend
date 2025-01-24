import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from "/logo.svg";
import BEFLogo from "/BEF_logo.png";
import WRILogo from "/WRI_logo_K.png";

function GlobalHeader() {
  return (
    <Box
      bgColor="white"
      shadow="sm"
      px="8"
      py="4"
      display="flex"
      justifyContent="space-between"
    >
      <Flex gap={12} alignItems="center">
        <Image src={logo} height="40px" alt="WRI Land Carbon Lab logo" />
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
        <Image src={BEFLogo} height="40px" alt="Bezos Earth Fund logo" />
        <Image src={WRILogo} height="40px" alt="World Resources Institute logo" />
      </Flex>
    </Box>
  );
}
export default GlobalHeader;
