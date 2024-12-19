import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource/ibm-plex-sans/index.css";

const isMock = import.meta.env.VITE_MOCK_QUERIES === "true";

async function deferRender() {
  if (isMock) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  } else {
    return Promise.resolve();
  }

}

deferRender().then(() => {
  createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
  );
});

