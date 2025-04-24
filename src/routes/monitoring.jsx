import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Collapsible, Grid, Heading } from "@chakra-ui/react";
import Providers from "../Providers";
import { ChatInput, ChatOutput, SidePanelWidget } from "../components";
import GlobalHeader from "../components/globalheader";
import { useColorModeValue } from "../components/ui/color-mode";
import { reportContentAtom, sidePanelContentAtom } from "../atoms";
import { CollecticonClipboard, CollecticonSpeechBalloon } from "@devseed-ui/collecticons-react";
import { useAtom } from "jotai";
import ReportContentWidget from "../components/ReportContentWidget";
import InsightsDrawer from "../components/insights/InsightsDrawer";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function Monitoring() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportContent, setReportContent] = useAtom(reportContentAtom);
  const [sidePanelContent] = useAtom(sidePanelContentAtom);
  const [layouts, setLayouts] = useState({});

  useEffect(() => {
    if (reportContent.length === 0) {
      setIsReportOpen(false);
    }
  }, [reportContent]);

  // Generate initial layout if not exists
  useEffect(() => {
    const generateLayout = () => {
      return reportContent.map((item, index) => ({
        i: item.title,
        x: 0,
        y: index,
        w: 1,
        h: item.h || 1,
        minH: 1,
        maxH: 10
      }));
    };

    setLayouts({ lg: generateLayout() });
  }, [reportContent]);

  const handleLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
    // Reorder reportContent based on layout y positions and save heights
    const newOrder = layout
      .slice()
      .sort((a, b) => a.y - b.y)
      .map(item => {
        const content = reportContent.find(content => content.title === item.i);
        return {
          ...content,
          h: item.h
        };
      });
    setReportContent(newOrder);
  };

  const panelBg = useColorModeValue("bg.panel", "bg.emphasized");
  return (
    <Providers>
      <Grid
        maxH="vh"
        h="vh"
        templateRows="min-content minmax(0, 1fr)"
        bg="bg"
      >
        <GlobalHeader />
        <Grid templateColumns="1fr" templateRows="1fr" autoColumns={isReportOpen ? "minmax(0px, 2fr)" : "3.5rem"} p="4" pt="0" gap="2">
          <Grid
            gap="4"
            autoColumns="minmax(0px, 2fr)"
            templateRows="max-content 1fr max-content"
            templateColumns="minmax(28rem, 1fr)"
            borderRadius="lg"
            shadow="md"
            justifyItems="center"
            p="4"
            pb="2"
            height="0"
            minH="100%"
            bg={panelBg}
            gridRow="1"
          >
            <Box
              m="-4"
              display="flex"
              gap="2"
              alignItems="center"
              h="fit-content"
              px="4"
              py="2"
              borderBottomWidth="1px"
              borderColor="border.emphasized"
              justifySelf="stretch"
              gridColumn={sidePanelContent && !isReportOpen && "1 / span all"}
            >
              <CollecticonSpeechBalloon size="24" />
              <Heading size="sm" m="0">
                Chat
              </Heading>
              <InsightsDrawer />
            </Box>
            <Box overflowY="auto" height="100%" mx="-4" mt="4" px="1" maxW="2xl" w="100%">
              <ChatOutput />
            </Box>
            <Box maxW="2xl" w="100%">
              <ChatInput />
            </Box>
            {!!sidePanelContent && !isReportOpen &&
              <SidePanelWidget />}
          </Grid>
          {reportContent.length > 0 &&
            <Collapsible.Root
              minH="100%"
              bg={panelBg}
              p="4"
              gridColumn="2"
              borderRadius="lg"
              shadow="md"
              isOpen={isReportOpen}
              onOpenChange={() => setIsReportOpen((prev) => !prev)}
              display="flex"
              flexDir="column"
              gap="4"
            >
              <Collapsible.Trigger cursor="pointer">
                <Box
                  m="-4"
                  display="flex"
                  gap="2"
                  justifyContent="start"
                  alignItems="center"
                  px="4"
                  py="3"
                  borderBottomWidth="1px"
                  borderColor="border.emphasized"
                >
                  <CollecticonClipboard size="24" />
                  {isReportOpen && (
                    <Heading size="sm" m="0">
                      Report
                    </Heading>
                  )}
                </Box>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Box overflow={reportContent.length > 1 ? "auto" : "visible"} maxH="100%">
                  {layouts.lg && (
                    <ResponsiveGridLayout
                      className="layout"
                      layouts={layouts}
                      breakpoints={{ lg: 1200 }}
                      cols={{ lg: 1 }}
                      rowHeight={300}
                      width={900}
                      margin={[10, 10]}
                      onLayoutChange={handleLayoutChange}
                      isDraggable={true}
                      isResizable={true}
                      useCSSTransforms={true}
                      draggableHandle=".drag-handle"
                    >
                      {reportContent.map((data) => (
                        <div key={data.title}>
                          <ReportContentWidget {...data} />
                        </div>
                      ))}
                    </ResponsiveGridLayout>
                  )}
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>}
        </Grid>
      </Grid>
    </Providers>
  );
}

export const Route = createFileRoute("/monitoring")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Monitoring />;
}
