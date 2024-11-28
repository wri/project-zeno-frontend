import { Box, Grid } from "@chakra-ui/react";
import Providers from "./Providers";
import { ChatInput, ChatOutput, Map } from "./components";
import { useChat } from "./hooks";

function App() {
  const { addPrompt, chatHistory } = useChat();

  return (
    <Providers>
      <Box position="absolute" top="0" left="0" bottom="0" right="0">
        <Map />
      </Box>
      <Grid
        position="absolute"
        top="4"
        left="4"
        bottom="4"
        width="80"
        borderRadius="4px"
        py="4"
        bgColor="rgba(255,255,255,.5)"
        gap="4"
        templateRows="1fr max-content"
        backdropFilter="blur(8px)"
      >
        <Box overflowY="auto" px="4">
          <ChatOutput chatHistory={chatHistory} />
        </Box>
        <Box px="4">
          <ChatInput addPrompt={addPrompt} />
        </Box>
      </Grid>
    </Providers>
  );
}

export default App;
