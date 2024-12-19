import { Box, Grid, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Providers from "./Providers";
import { ChatInput, ChatOutput, Map } from "./components";
import { chartDataAtom } from "./atoms";
import BarChart from "./components/BarChart";

function App() {
  const chartData = useAtomValue(chartDataAtom);
  return (
    <Providers>
      <Grid
        maxH="vh"
        h="vh"
        templateRows="min-content minmax(0, 1fr)"
        bg="blue.900/15"
        bgImage="linear-gradient({colors.lime.50}, transparent)"
      >
        <Box bgColor="blue.50" shadow="sm" px="8" py="4">
          <Text as="h1" color="blue.900" fontWeight="700">Land Carbon Lab - Zeno</Text>
        </Box>
        <Grid templateColumns="350px 1fr" p="8" gap="2">
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
