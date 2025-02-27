import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Collapsible, Grid, Heading } from "@chakra-ui/react";
import Providers from "../Providers";
import { ChatInput, ChatOutput, SidePanelWidget } from "../components";
import GlobalHeader from "../components/globalheader";
import { CollecticonClipboard, CollecticonSpeechBalloon } from "@devseed-ui/collecticons-react";

function Monitoring() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const reportContent = true;

  return (
    <Providers>
      <Grid
        maxH="vh"
        h="vh"
        templateRows="min-content minmax(0, 1fr)"
        bg="gray.50"
      >
        <GlobalHeader />
        <Grid templateColumns="1fr" templateRows="1fr" p="6" gap="2">
          <Grid
            gap="4"
            templateRows="max-content 1fr max-content"
            templateColumns="minmax(28rem, 1fr)"
            borderRadius="lg"
            shadow="md"
            justifyItems="center"
            px="4"
            py="6"
            height="0"
            minH="100%"
            bgColor="white"
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
              border="1"
              borderBottomWidth="1px"
              justifySelf="stretch"
              gridColumn="1 / span all"
            >
              <CollecticonSpeechBalloon size="24" />
              {!isReportOpen && (
                <Heading size="sm" m="0">
                  Chat
                </Heading>
              )}
            </Box>
            <Box overflowY="auto" gridColumn="1" height="100%" mx="-4" mt="4" px="4" maxW="2xl" w="100%">
              <ChatOutput />
            </Box>
            <Box gridColumn="1" maxW="2xl" w="100%">
              <ChatInput />
            </Box>
            {!isReportOpen &&
              <SidePanelWidget />}
          </Grid>
          {reportContent &&
          <Collapsible.Root
            minH="100%"
            bgColor="white"
            p="4"
            gridColumn="2"
            borderRadius="lg"
            shadow="md"
            isOpen={open}
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
                border="1"
                borderBottomWidth="1px"
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
              <Box>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
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
