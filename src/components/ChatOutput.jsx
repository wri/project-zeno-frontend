import { useRef } from "react";
import T from "prop-types";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

function MessageIn({ message }) {
  return (
    <Box ml="12" mb="4" p="2" bgColor="blue.700" color="white" borderRadius="4px">
      {message}
    </Box>
  );
}

MessageIn.propTypes = {
  message: T.string.isRequired
};

function ChatOutput({ chatHistory }) {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        const e = entries[0];

        const parentElement = e.target.parentElement;
        const elementHeight = e.contentRect.height;

        if (elementHeight > parentElement.clientHeight) {
          parentElement.scrollTop = e.target.scrollHeight;
        }
      });
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }

  }, []);

  return (
    <Box ref={containerRef}>
      {chatHistory.map((msg) => {
        if (msg.type === "in") {
          return <MessageIn key={msg.timestamp} message={msg.message} />;
        }
      })}
    </Box>
  );
}

ChatOutput.propTypes = {
  chatHistory: T.array.isRequired
};

export default ChatOutput;
