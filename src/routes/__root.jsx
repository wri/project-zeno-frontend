import { createRootRoute, Outlet, Navigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const devToolsEnabled = import.meta.env.MODE === "development";

function NotFound() {
  return Navigate({ to: "/alerting" }); // Redirect to your notFound route
}


export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {
        devToolsEnabled && <TanStackRouterDevtools initialIsOpen="false" />
      }
    </>
  ),
  notFoundComponent: NotFound
});
