import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Providers from "./Providers";
import { ChatInput, ChatOutput, Map } from "./components";
import BarChart from "./components/BarChart";
import FilmStrip from "./components/FilmStrip";
import TabbedPanel from "./components/TabbedPanel";
import logo from "/logo.svg";
import ExportPane from "./components/ExportPane";
import GlobalHeader from "./components/globalheader";

function App() {
  const SecondaryWidgetTabs = [
    {
      value: "chart",
      title: "Data Visualization",
      component: <BarChart />,
    },
    {
      value: "imagery",
      title: "Recent Imagery",
      component: <FilmStrip />,
    },
    {
      value: "exports",
      title: "Export data",
      component: <ExportPane />,
    },
  ];
  return (
    <Providers>
      <Grid
        maxH="vh"
        h="vh"
        templateRows="min-content minmax(0, 1fr)"
        bg="gray.50"
      >
        <GlobalHeader />
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
