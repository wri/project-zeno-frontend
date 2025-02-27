import { createFileRoute } from "@tanstack/react-router";
import { Box, Grid } from "@chakra-ui/react";
import { ChatInput, ChatOutput } from "../components";
import GlobalHeader from "../components/globalheader";
import { useColorModeValue } from "../components/ui/color-mode";

function Monitoring() {
  return (
    <Grid
      maxH="vh"
      h="vh"
      templateRows="min-content minmax(0, 1fr)"
      bg="bg"
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
          <Box borderRadius="lg" shadow="md" overflow="hidden" />
        </Grid>
      </Grid>
    </Grid>
  );
}

export const Route = createFileRoute("/monitoring")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Monitoring />;
}
