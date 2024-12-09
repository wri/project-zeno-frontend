import T from "prop-types";
import { Box }  from "@chakra-ui/react";
import MiniMap from "./MiniMap";
import BarChart from "./BarChart";

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

function LocationTool({message, artifact}) {
  /**
   * LocationTool component
   * message is found location
   * artifact is geojson object to render to a map
   */
  return (
    <>
      <h2>Location tool</h2>
      <p>Location found: <b>{message}</b></p>
      <h3>Map</h3>
      <Box height="200px" position="relative">
        <MiniMap artifact={artifact} />
      </Box>
    </>
  );
}

LocationTool.propTypes = {
  message: T.string.isRequired,
  artifact: T.object
};

function DistAlertsTool({message, artifact}) {
  // message is of the form { "location": { "category": "value"}, { "category": "value"} }
  // artifact is geojson object to render to a map

  const json = JSON.parse(message);
  const keys = Object.keys(json);
  const data = Object.entries(json[keys[0]]).map(([category, value]) => ({ category, value }));
  return (
    <>
      <h2>Dist alerts tool</h2>
      <h3>Dist alerts</h3>
      <BarChart data={data} />
      <h3>Map</h3>
      <Box height="200px" position="relative">
        <MiniMap artifact={artifact} />
      </Box>
    </>
  );
}

DistAlertsTool.propTypes = {
  message: T.string.isRequired,
  artifact: T.object
};

function MessageTool({message, toolName, artifact}) {
  let render;

  switch(toolName) {
    case "context-layer-tool":
      render = <ContextLayer message={message} />;
      break;
    case "location-tool":
      render = <LocationTool message={message} artifact={artifact} />;
      break;
    case "dist-alerts-tool":
      render = <DistAlertsTool message={message} artifact={artifact} />;
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
