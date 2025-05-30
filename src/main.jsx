import { StrictMode } from "react";
import Providers from "./Providers";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import "@fontsource/ibm-plex-sans/index.css";
import "@fontsource/ibm-plex-mono/index.css";

const isMock = import.meta.env.VITE_MOCK_QUERIES === "true";

const history = createHashHistory();

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
  history,
  basepath: "/",
});

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  deferRender().then(() => {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <Providers>
          <RouterProvider router={router} />
        </Providers>
      </StrictMode>,
    );
  });
}
