import { createFileRoute } from "@tanstack/react-router";
import { Box, Grid } from "@chakra-ui/react";
import Providers from "../Providers";
import { ChatInput, ChatOutput, SidePanelWidget } from "../components";
import GlobalHeader from "../components/globalheader";

function Monitoring() {
  return (
    <Providers>
      <Grid
        maxH="vh"
        h="vh"
        templateRows="min-content minmax(0, 1fr)"
        bg="gray.50"
      >
        <GlobalHeader />
        <Grid templateColumns="1fr" p="6" gap="2">
          <Grid
            gap="4"
            templateRows="1fr max-content"
            templateColumns="minmax(28rem, 1fr)"
            borderRadius="lg"
            shadow="md"
            justifyItems="center"
            p="4"
            height="0"
            minH="100%"
            bgColor="white"
          >
            <Box overflowY="auto" height="100%" mx="-4" px="4" maxW="2xl" w="100%">
              <ChatOutput />
            </Box>
            <Box gridColumn="1" maxW="2xl" w="100%">
              <ChatInput />
            </Box>
            <SidePanelWidget />
          </Grid>
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
