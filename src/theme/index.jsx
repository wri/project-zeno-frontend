"use client";

import { createSystem, defaultConfig } from "@chakra-ui/react";

const config = {
  theme: {
    tokens: {
      fonts: {
        body: { value: "IBM Plex Sans" },
        heading: { value: "IBM Plex Sans" },
      }
    }
  }
};

export default createSystem(defaultConfig, config);
