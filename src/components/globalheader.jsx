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
import { LclLogo } from ".";
import WRILogo from "./WRIlogo";
import BEFLogo from "./BEFLogo";
import { ColorModeButton } from "./ui/color-mode";
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
