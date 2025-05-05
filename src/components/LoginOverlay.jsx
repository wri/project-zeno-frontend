import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  Link,
  Portal,
  Text,
  Center,
  Spinner,
  VStack
} from "@chakra-ui/react";
import { isAuthenticatedAtom, authTokenAtom, currentUserEmailAtom } from "../atoms";

// --- Reusable Dialog Component ---
function AuthDialog({ open, children }) {
  return (
    <Dialog.Root
      open={open}
      placement="center"
      closeOnInteractOutside={false}
      closeOnEsc={false}
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(2px)" />
        <Dialog.Positioner>
          <Dialog.Content size="md" minH="200px">
            {children}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

// --- Add prop types validation ---
AuthDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

// --- Constants ---
const wriAuthUrl = "https://api.resourcewatch.org/auth/login";
const callbackUrl = `${window.location.origin}${import.meta.env.BASE_URL}callback.html`;
const ALLOWED_DOMAINS = ["wri.org", "developmentseed.org", "wriconsultant.org"];

// --- Main Login Overlay Component ---
function LoginOverlay() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  // eslint-disable-next-line no-unused-vars
  const [_authToken, setAuthToken] = useAtom(authTokenAtom);
  const userEmail = useAtomValue(currentUserEmailAtom);
  const [isLoadingInitialAuth, setIsLoadingInitialAuth] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [_isWhitelisted, setIsWhitelisted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New state for logout indication

  // Handle the login popup flow and token reception
  useEffect(() => {
    const handleAuthMessage = (event) => {
      if (event.origin !== window.location.origin) {
        console.warn("Received message from unexpected origin:", event.origin);
        return;
      }

      if (event.data && event.data.token) {
        setAuthToken(event.data.token);
      } else if (event.data && event.data.error) {
        console.error("Authentication error:", event.data.error);
        setAuthToken(null);
      }
    };

    window.addEventListener("message", handleAuthMessage, false);

    setIsLoadingInitialAuth(false);

    return () => {
      window.removeEventListener("message", handleAuthMessage, false);
    };
  }, [setAuthToken]);

  // Determine overlay visibility and whitelist status based solely on auth state
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      const domain = userEmail.split("@")[1];
      if (ALLOWED_DOMAINS.includes(domain)) {
        setIsWhitelisted(true);
        setShowOverlay(false);
      } else {
        setIsWhitelisted(false);
        setShowOverlay(true);
      }
    } else {
      setIsWhitelisted(false);
      setShowOverlay(true);
    }
  }, [userEmail, isAuthenticated, setIsWhitelisted, setShowOverlay]);

  const handleLoginClick = () => {
    const authUrl = `${wriAuthUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}&token=true`;
    window.open(authUrl, "WRI Login", "width=600,height=700");
  };

  // Extracted logout handler
  const handleLogoutClick = () => {
    setIsLoggingOut(true); // Set logging out state immediately

    const logoutRedirectUri = `${window.location.origin}${import.meta.env.BASE_URL}`;
    const resourceWatchLogoutUrl = `https://api.resourcewatch.org/auth/logout?redirect_uri=${encodeURIComponent(logoutRedirectUri)}`;

    setAuthToken(null); // Clear local token
    // Redirect happens very quickly after state update
    window.location.href = resourceWatchLogoutUrl;
  };

  // --- Render Logic using AuthDialog ---

  // 1. Initial Loading State
  if (isLoadingInitialAuth) {
    return (
      <AuthDialog open={true}>
        <Center h="200px">
          <VStack>
            <Spinner size="xl" />
            <Text mt={4}>Checking authentication...</Text>
          </VStack>
        </Center>
      </AuthDialog>
    );
  }

  // 2. Logging Out State
  if (isLoggingOut) {
    return (
      <AuthDialog open={true}>
        <Center h="200px">
          <VStack>
            <Spinner size="xl" />
            <Text mt={4}>Logging out...</Text>
          </VStack>
        </Center>
      </AuthDialog>
    );
  }

  // 3. Not Authenticated or Not Whitelisted States
  if (!showOverlay) {
    return null; // User is authenticated and whitelisted
  }

  let dialogInnerContent;
  if (!isAuthenticated) {
    // 3a. Login Required
    dialogInnerContent = (
      <>
        <Dialog.Header>
          <Dialog.Title>Login Required</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Text mb={4}>Please log in with your WRI account to access Project Zeno.</Text>
          <Button colorScheme="blue" onClick={handleLoginClick} isFullWidth>
            Login with WRI
          </Button>
        </Dialog.Body>
      </>
    );
  } else {
    // 3b. Access Denied (Authenticated but not whitelisted)
    dialogInnerContent = (
      <>
        <Dialog.Header>
          <Dialog.Title>Access Denied</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Text mb={4}>
            Your email domain (<b>{userEmail?.split("@")[1] || "N/A"}</b>) is not currently whitelisted for access.
          </Text>
          <Text mb={4}>
            If you believe this is an error, please contact the project
            administrators. Alternatively, you can request access to the beta
            program by filling out this short survey:
            <Link href="https://survey.alchemer.com/s3/8281976/81c229009ea6-website" isExternal color="blue.500" ml={1}>
              [Interest Form for Land & Carbon Lab&apos;s AI-driven Tools]
            </Link>.
          </Text>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogoutClick}
          >
            Logout & Try Again
          </Button>
        </Dialog.Body>
      </>
    );
  }

  // Render the main overlay dialog
  return (
    <AuthDialog open={showOverlay}>
      {dialogInnerContent}
    </AuthDialog>
  );
}

export default LoginOverlay; 
