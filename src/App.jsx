import { Box, Grid, Text } from "@chakra-ui/react";
import Providers from "./Providers";
import { ChatInput, ChatOutput, Map } from "./components";

function App() {
  return (
    <Providers>
      <Grid position="absolute" top="0" left="0" bottom="0" right="0" templateRows="max-content 1fr">
        <Box bgColor="blue.50" shadow="sm" px="8" py="4">
          <Text as="h1" color="blue.900" fontWeight="700">Land Carbon Lab - Zeno</Text>
        </Box>
        <Grid templateColumns="300px 1fr" p="8" gap="2">
          <Grid
            gap="4"
            templateRows="1fr max-content"
            borderRadius="lg"
            shadow="md"
            p="4"
          >
            <Box overflowY="auto" mx="-8" px="8">
              <ChatOutput />
            </Box>
            <Box>
              <ChatInput />
            </Box>
          </Grid>
          <Box
            borderRadius="lg"
            shadow="md"
            overflow="hidden"
          >
            <Map />
          </Box>
        </Grid>
      </Grid>
    </Providers>
  );
}

export default App;
