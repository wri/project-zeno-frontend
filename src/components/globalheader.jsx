import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import {
  MenuContent,
  MenuRadioItemGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
} from "./ui/menu";
import logo from "/logo.svg";
import BEFLogo from "/BEF_logo.png";
import WRILogo from "/WRI_logo_K.png";
import { CollecticonChevronDownSmall } from "@devseed-ui/collecticons-react";

function GlobalHeader() {
  const location = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState("alerting");
  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path) {
      setSelectedMenuItem(path);
    }
  }, [location]);

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
        <MenuRoot size="sm">
          <MenuTrigger>
            <Button
              variant="outline"
              size="sm"
              fontFamily="mono"
              fontSize="xs"
              textTransform="uppercase"
              fontWeight="light"
              textAlign="left"
              lineHeight="1"
            >
              Mode:
              <br />
              {selectedMenuItem}
              <CollecticonChevronDownSmall />
            </Button>
          </MenuTrigger>
          <MenuContent
            fontFamily="mono"
            fontSize="xs"
            textTransform="uppercase"
            fontWeight="light"
            textAlign="left"
          >
            <MenuRadioItemGroup value={selectedMenuItem} onValueChange={(e) => setSelectedMenuItem(e.value)}>
              <MenuRadioItem value="alerting" navigate={() => setSelectedMenuItem("alerting")}>
                <Link to="/alerting">Alerting</Link>
              </MenuRadioItem>
              <MenuRadioItem value="monitoring" navigate={() => setSelectedMenuItem("monitoring")}>
                <Link to="/monitoring">Monitoring</Link>
              </MenuRadioItem>
            </MenuRadioItemGroup>
          </MenuContent>
        </MenuRoot>
      </Flex>
      <Flex gap={12} alignItems="center">
        <Image src={BEFLogo} height="40px" alt="Bezos Earth Fund logo" />
        <Image src={WRILogo} height="40px" alt="World Resources Institute logo" />
      </Flex>
    </Box>
  );
}
export default GlobalHeader;
