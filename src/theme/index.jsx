import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import globalCss from "./globalCss";

const config = defineConfig({
  globalCss,
  theme: {
    tokens: {
      fonts: {
        body: { value: "IBM Plex Sans" },
        heading: { value: "IBM Plex Sans" },
      }
    }
  }
});

export default createSystem(defaultConfig, config);
