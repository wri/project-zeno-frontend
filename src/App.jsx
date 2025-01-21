import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Providers from "./Providers";
import { ChatInput, ChatOutput, Map } from "./components";
import { chartDataAtom } from "./atoms";
import BarChart from "./components/BarChart";
import logo from "/logo.svg";

function App() {
  const chartData = useAtomValue(chartDataAtom);
  return (
    <Providers>
      <Grid
        maxH="vh"
        h="vh"
        templateRows="min-content minmax(0, 1fr)"
        bg="gray.50"
      >
        <Box bgColor="white" shadow="sm" px="8" py="4">
          <Flex gap={12} alignItems="center">
            <Image src={logo} height="40px" />
            <Text 
              fontFamily="mono"
              fontVariantNumeric="slashed-zero"
              fontFeatureSettings="'ss03'"
              letterSpacing="0.75px"
              lineHeight="100%"
              textTransform="uppercase"
              fontWeight="500"
            >
              Pr0ject <br /> Zen0_
            </Text>
          </Flex>
        </Box>
        <Grid templateColumns="350px 1fr" p="6" gap="2">
          <Grid
            gap="4"
            templateRows="1fr max-content"
            borderRadius="lg"
            shadow="md"
            p="4"
            height="0"
            minH="100%"
            bgColor="white"
          >
            <Box overflowY="auto" height="100%" mx="-4" px="4">
              <ChatOutput />
            </Box>
            <Box>
              <ChatInput />
            </Box>
          </Grid>
          <Grid templateRows={chartData ? "1fr 250px" : "1fr"} gap="2">
              <Box borderRadius="lg" shadow="md" overflow="hidden">
                <Map />
              </Box>
              {chartData && (
                <Box bgColor="white" borderRadius="lg" shadow="md" overflow="hidden">
                  <BarChart data={chartData} />
                </Box>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Providers>
  );
}

export default App;
