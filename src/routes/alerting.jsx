import { createFileRoute } from "@tanstack/react-router";
import { Box, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { ChatInput, ChatOutput, Map } from "../components";
import BarChart from "../components/BarChart";
import FilmStrip from "../components/FilmStrip";
import TabbedPanel from "../components/TabbedPanel";
import ExportPane from "../components/ExportPane";
import GlobalHeader from "../components/globalheader";
import { showAudioButtonsAtom } from "../atoms";
import { useSetAtom } from "jotai";
import { useColorModeValue } from "../components/ui/color-mode";

function Alerting() {
  const setShowAudioButtons = useSetAtom(showAudioButtonsAtom);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "y") {
        setShowAudioButtons((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowAudioButtons]);

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
    <Grid
      maxH="vh"
      h="vh"
      templateRows="min-content minmax(0, 1fr)" 
      bg="bg"
    >
      <GlobalHeader />
      <Grid templateColumns="28rem 1fr" p="4" pt="0" gap="2">
        <Grid
          gap="4"
          templateRows="1fr max-content"
          borderRadius="lg"
          shadow="md"
          p="4"
          pb="2"
          height="0"
          minH="100%"
          bg={useColorModeValue("bg.panel", "bg.emphasized")}
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
  );
}

export const Route = createFileRoute("/alerting")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Alerting />;
}
