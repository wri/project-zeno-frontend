import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import globalCss from "./globalCss";

export const config = defineConfig({
  globalCss,
  theme: {
    tokens: {
      fonts: {
        body: { value: "IBM Plex Sans, sans-serif" },
        mono: { value: "IBM Plex Mono, monospace"},
        heading: { value: "IBM Plex Sans, sans-serif" },
      },
      colors: {
        blue: {
          50: "#ebf9ff",
          100: "#d1f1ff",
          200: "#aee7ff",
          300: "#76dbff",
          400: "#35c4ff",
          500: "#07a0ff",
          600: "#007bff",
          700: "#0062ff",
          800: "#0051d7",
          900: "#0049a8", //primary
          950: "#062d65",
        },

        lime: {
          50: "#fcfee7",
          100: "#f7fbcc",
          200: "#eef89e",
          300: "#def066",
          400: "#cbe437",
          500: "#adca18", //primary
          600: "#87a10f",
          700: "#667b10",
          800: "#516113",
          900: "#445215",
          950: "#242e05",
        },
        cyan: { 500: "#01B9F3" },
        indigo: { 500: "#6F6FDF" },
        purple: { 500: "#BA4AFF" },
        pink: { 500: "#F26798" },
        red: { 500: "#FF452C" },
        orange: { 500: "#FF9916" },
        yellow: { 500: "#FFD80B" },
        mint: { 500: "#00DCA7" },
        green: { 500: "#00A651" },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
