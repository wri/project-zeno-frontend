import { Box, Grid, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Providers from "./Providers";
import { ChatInput, ChatOutput, Map } from "./components";
import { chartDataAtom } from "./atoms";
import BarChart from "./components/BarChart";
import FilmStrip from "./components/FilmStrip";
import TabbedPanel from "./components/TabbedPanel";

function App() {
  const chartData = useAtomValue(chartDataAtom);
  const SecondaryWidgetTabs = [
    {
      value: "chart",
      title: "Data Visualization",
      component: chartData ? <BarChart data={chartData} /> : "Test",
    },
    {
      value: "imagery",
      title: "Recent Imagery",
      component: <FilmStrip />,
    },
    {
      value: "exports",
      title: "Export data",
      component: <Box />,
    },
  ];
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
          <Grid templateRows="1fr" gap="2">
            <Box borderRadius="lg" shadow="md" overflow="hidden">
              <Map />
            </Box>
            <TabbedPanel tabData={SecondaryWidgetTabs} />
          </Grid>
        </Grid>
      </Grid>
    </Providers>
  );
}

export default App;
