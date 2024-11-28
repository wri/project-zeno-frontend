import T from "prop-types";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";

function Providers({ children }) {
  return (
    <ChakraProvider value={theme}>
      {children}
    </ChakraProvider>
  );
}

Providers.propTypes = {
  children: T.node.isRequired
};

export default Providers;
