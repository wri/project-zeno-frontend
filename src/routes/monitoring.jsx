import { createFileRoute } from "@tanstack/react-router";
import { Box, Collapsible, Heading, Grid, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Providers from "../Providers";
import { ChatInput, ChatOutput } from "../components";
import GlobalHeader from "../components/globalheader";
import {
  CollecticonClipboard,
  CollecticonSpeechBalloon,
} from "@devseed-ui/collecticons-react";

function Monitoring() {
  const [isOpen, setIsOpen] = useState(false);

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
            borderRadius="lg"
            shadow="md"
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
            >
              <CollecticonSpeechBalloon size="24" />
              <Heading size="sm" m="0">
                Chat
              </Heading>
            </Box>
            <Box overflowY="auto" height="100%" mx="-4" px="4">
              <ChatOutput />
            </Box>
            <Box>
              <ChatInput />
            </Box>
          </Grid>
          <Collapsible.Root
            minH="100%"
            bgColor="white"
            p="4"
            gridRow="1"
            gridColumn="2"
            borderRadius="lg"
            shadow="md"
            maxW="50vw"
            isOpen={open}
            onOpenChange={() => setIsOpen((prev) => !prev)}
            display="flex"
            flexDir="column"
            gap="4"
          >
            <Collapsible.Trigger w="100%" cursor="pointer">
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
                {isOpen && (
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
          </Collapsible.Root>
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
