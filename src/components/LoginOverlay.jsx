import { useEffect, useState } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { 
  Box, 
  Button, 
  Dialog,
  Link,
  Portal,
  Text, 
  Center, 
  Spinner, 
  VStack 
} from '@chakra-ui/react';
import { isAuthenticatedAtom, authTokenAtom, currentUserEmailAtom } from '../atoms';

const wriAuthUrl = "https://api.resourcewatch.org/auth/login";

// Construct callbackUrl using Vite's base URL environment variable
const callbackUrl = `${window.location.origin}${import.meta.env.BASE_URL}callback.html`;

const ALLOWED_DOMAINS = ['wri.org', 'developmentseed.org']; 

function LoginOverlay() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const userEmail = useAtomValue(currentUserEmailAtom);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Handle the login popup flow and token reception
  useEffect(() => {
    const handleAuthMessage = (event) => {
      if (event.origin !== window.location.origin) {
        console.warn('Received message from unexpected origin:', event.origin);
        return;
      }

      if (event.data && event.data.token) {
        console.log('Received auth token:', event.data.token);
        setAuthToken(event.data.token);
      } else if (event.data && event.data.error) {
        console.error('Authentication error:', event.data.error);
        setAuthToken(null);
        setIsCheckingAuth(false);
      }
    };

    window.addEventListener('message', handleAuthMessage, false);

    setIsCheckingAuth(false);

    return () => {
      window.removeEventListener('message', handleAuthMessage, false);
    };
  }, [setAuthToken]);

  // Check email whitelist when email is available OR auth state changes
  useEffect(() => {
    if (isCheckingAuth) {
      setShowOverlay(true);
      setIsWhitelisted(false);
      return;
    }

    if (isAuthenticated && userEmail) {
      const domain = userEmail.split('@')[1];
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
  }, [userEmail, isAuthenticated, isCheckingAuth]);

  const handleLoginClick = () => {
    const authUrl = `${wriAuthUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}&token=true`;
    window.open(authUrl, "WRI Login", "width=600,height=700");
  };

  // Render logic
  if (!showOverlay && !isCheckingAuth) {
    return null;
  }

  let dialogInnerContent;
  if (isCheckingAuth) {
    dialogInnerContent = (
        <Center h="200px">
            <VStack>
                <Spinner size="xl" />
                <Text mt={4}>Checking authentication...</Text>
            </VStack>
        </Center>
    );
  } else if (!isAuthenticated) {
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
  } else if (!isWhitelisted) {
    dialogInnerContent = (
      <>
        <Dialog.Header>
          <Dialog.Title>Access Denied</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Text mb={4}>
            Your email domain (<b>{userEmail?.split('@')[1] || 'N/A'}</b>) is not currently whitelisted for access.
          </Text>
          <Text mb={4}>
            If you believe this is an error, please contact the project 
            administrators. Alternatively, you can request access to the beta 
            program by filling out this short survey:
            <Link href="https://survey.alchemer.com/s3/8281976/81c229009ea6-website" isExternal color="blue.500" ml={1}> 
              [Interest Form for Land & Carbon Lab's AI-driven Tools]
            </Link>.
          </Text>
          <Button size="sm" variant="outline" onClick={() => setAuthToken(null)}>
             Logout
          </Button>
        </Dialog.Body>
      </>
    );
  }

  return (
    <Dialog.Root 
      open={showOverlay} 
      placement="center"
      closeOnInteractOutside={false} 
      closeOnEsc={false} 
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(2px)" />
        <Dialog.Positioner>
          <Dialog.Content size="md" minH="200px"> 
            {dialogInnerContent}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default LoginOverlay; 