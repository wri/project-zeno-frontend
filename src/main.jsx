import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@fontsource/ibm-plex-sans/index.css";
import "@fontsource/ibm-plex-mono/index.css";

const isMock = import.meta.env.VITE_MOCK_QUERIES === "true";
const basePath = import.meta.env.VITE_BASE_PATH || "/";

async function deferRender() {
  if (isMock) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  } else {
    return Promise.resolve();
  }
}

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  basepath: basePath,
  onLoad: () => {
    router.navigate("/alerting");
  }
});

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  deferRender().then(() => {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  });
}
