import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Grid } from "@chakra-ui/react";
import GlobalHeader from "../components/globalheader"; // Adjusted path
import LoginOverlay from "../components/LoginOverlay"; // Adjusted path

const devToolsEnabled = import.meta.env.MODE === "development";

function RootComponent() {
  // Note: The content previously in App.jsx's main grid (Chat, Map, Tabs, etc.)
  // should now be defined within the components rendered by child routes
  // (e.g., alerting.jsx, monitoring.jsx) which will render into the <Outlet /> below.
  return (
    <Grid maxH="vh" h="vh" templateRows="min-content minmax(0, 1fr)" bg="bg">
      <LoginOverlay />
      <Outlet />
      {
        devToolsEnabled && <TanStackRouterDevtools initialIsOpen="false" />
      }
    </Grid>
  );
}

export const Route = createRootRoute({
  component: RootComponent, // Use the defined component
  // notFoundComponent: NotFound // Assuming NotFound is handled differently or defined elsewhere now
});
