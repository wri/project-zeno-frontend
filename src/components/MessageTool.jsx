import T from "prop-types";
import { Box }  from "@chakra-ui/react";

function ContextLayer({message}) {
  return (
    <>
      <h2>Context layer</h2>
      <p>Use context layer <b>{message}</b></p>
    </>
  );
}

ContextLayer.propTypes = {
  message: T.string.isRequired
};

function MessageTool({message, toolName, artifact}) {
  let render;

  switch(toolName) {
    case "context-layer-tool":
      render = <ContextLayer message={message} />;
      break;
    default:
      render = message;
      break;
  }

  return (
    <Box mb="4" p="2" bgColor="gray.50" borderRadius="4px">
      {render}
    </Box>
  );
}

MessageTool.propTypes = {
  message: T.string.isRequired,
  toolName: T.oneOf(["context-layer-tool", "location-tool", "dist-alerts-tool"]),
  artifact: T.object
};

export default MessageTool;
