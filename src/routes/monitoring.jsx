import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Collapsible, Grid, Heading, List } from "@chakra-ui/react";
import Providers from "../Providers";
import { ChatInput, ChatOutput, SidePanelWidget } from "../components";
import GlobalHeader from "../components/globalheader";
import { useColorModeValue } from "../components/ui/color-mode";
import { reportContentAtom, sidePanelContentAtom } from "../atoms";
import { CollecticonClipboard, CollecticonSpeechBalloon } from "@devseed-ui/collecticons-react";
import { useAtom } from "jotai";
import ReportContentWidget from "../components/ReportContentWidget";

function Monitoring() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportContent] = useAtom(reportContentAtom);
  const [sidePanelContent] = useAtom(sidePanelContentAtom);
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
        <Grid templateColumns="1fr" templateRows="1fr" p="4" pt="0" gap="2">
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
              py="3"
              borderBottomWidth="1px"
              borderColor="border.emphasized"
              justifySelf="stretch"
              gridColumn={sidePanelContent && !isReportOpen && "1 / span all"}
            >
              <CollecticonSpeechBalloon size="24" />
              <Heading size="sm" m="0">
                Chat
              </Heading>
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
                  <List.Root listStyle="none" p="0" mt="4" mb="0">
                    {reportContent.map((data) => (
                      <List.Item key={data.title}>
                        <ReportContentWidget {...data} />
                      </List.Item>
                    ))}
                  </List.Root>
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
