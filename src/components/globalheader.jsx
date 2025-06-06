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
import BEFLogo from "./BEFLogo";
import WRILogo from "/WRI_logo.png";
import { ColorModeButton } from "./ui/color-mode";
import { CollecticonChevronDownSmall } from "@devseed-ui/collecticons-react";
import {
  currentAppTypeAtom,
  isAuthenticatedAtom,
  authTokenAtom,
  currentUserEmailAtom
} from "../atoms";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

function GlobalHeader() {
  const location = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState("alerting");
  const [, setSelectedAppType] = useAtom(currentAppTypeAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
  const userEmail = useAtomValue(currentUserEmailAtom);

  useEffect(() => {
    const path = location.pathname.split("/").reverse()[0];
    if (path && (path === "alerting" || path === "monitoring")) {
      setSelectedMenuItem(path);
      setSelectedAppType(path);
    } else {
      setSelectedMenuItem("alerting");
      setSelectedAppType("alerting");
    }
  }, [location, setSelectedAppType]);

  const handleLogout = () => {
    setAuthToken(null);
  };

  return (
    <Box
      px="6"
      pr="8"
      py="4"
      display="flex"
      justifyContent="space-between"
    >
      <Flex gap={12} alignItems="center">
        <LclLogo width={80} />
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
              <Link to="/alerting">
                <MenuRadioItem value="alerting" navigate={() => setSelectedMenuItem("alerting")}>
                  Alerting
                </MenuRadioItem>
              </Link>
              <Link to="/monitoring">
                <MenuRadioItem value="monitoring" navigate={() => setSelectedMenuItem("monitoring")}>
                  Monitoring
                </MenuRadioItem>
              </Link>
            </MenuRadioItemGroup>
          </MenuContent>
        </MenuRoot>
      </Flex>
      <Flex gap={4} alignItems="center">
        <ColorModeButton />
        {isAuthenticated ? (
          <Flex alignItems="center" gap={3}>
            {userEmail && <Text fontSize="sm">Welcome, {userEmail}!</Text>}
            <Button size="sm" onClick={handleLogout}>Logout</Button>
          </Flex>
        ) : (
          <Text fontSize="sm" fontStyle="italic" color="gray.500">Not logged in</Text>
        )}
        <a href="https://www.bezosearthfund.org/" target="_blank" rel="noreferrer" title="Bezos Earth Fund Logo">
          <BEFLogo width={92} />
        </a>
        <a href="https://www.wri.org/" target="_blank" rel="noreferrer" title="WRI Logo">
          <Image src={WRILogo} alt="WRI Logo" width="120px" css={{ _dark: { filter: "invert(1) saturate(0) brightness(6)" } }} />
        </a>
      </Flex>
    </Box>
  );
}
export default GlobalHeader;
