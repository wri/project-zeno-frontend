import T from "prop-types";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode";

import theme from "./theme";

function Providers({ children }) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}

Providers.propTypes = {
  children: T.node.isRequired
};

export default Providers;
