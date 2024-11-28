import { Box } from "@chakra-ui/react";
import Providers from "./Providers";
import { Map } from "./components";

function App() {
  return (
    <Providers>
      <Box position="absolute" top="0" left="0" bottom="0" right="0">
        <Map />
      </Box>
    </Providers>
  );
}

export default App;
