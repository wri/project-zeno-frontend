import { createFileRoute } from "@tanstack/react-router";
import { Box, Grid } from "@chakra-ui/react";
import Providers from "../Providers";
import { ChatInput, ChatOutput } from "../components";
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
        <Grid templateColumns="28rem 1fr" p="6" gap="2">
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
            <Box borderRadius="lg" shadow="md" overflow="hidden" />
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
