import { createFileRoute, Navigate } from '@tanstack/react-router';

// This route corresponds to the root path "/"
export const Route = createFileRoute('/')({
  component: IndexRedirect,
});

function IndexRedirect() {
  // When the root path "/" is matched, navigate to "/alerting"
  // `replace` ensures the redirect doesn't add an entry to the history stack
  return <Navigate to="/alerting" replace />;
} 