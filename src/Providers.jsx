import T from "prop-types";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
import { ChatHistoryProvider } from "./context/ChatHistory";

function Providers({ children }) {
  return (
    <ChakraProvider value={theme}>
      <ChatHistoryProvider>
        {children}
      </ChatHistoryProvider>
    </ChakraProvider>
  );
}

Providers.propTypes = {
  children: T.node.isRequired
};

export default Providers;
