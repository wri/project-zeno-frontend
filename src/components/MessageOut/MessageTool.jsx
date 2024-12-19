import T from "prop-types";
import { Box, Button }  from "@chakra-ui/react";
import MessageOutWrapper from "./wrapper";
import MiniMap from "../MiniMap";
import BarChart from "../BarChart";

import { useSetAtom } from "jotai";
import { mapLayersAtom } from "../../atoms";

function ContextLayer({message}) {
  return (<p>Using context layer <b>{message}</b></p>);
}


ContextLayer.propTypes = {
  message: T.string.isRequired
};

function LocationTool({artifact}) {
  /**
   * LocationTool component
   * message is found location
   * artifact is geojson object to render to a map
   */

  const setMapLayers = useSetAtom(mapLayersAtom);

  const numLocations = artifact ? artifact?.features.length : 0;

  if (numLocations === 0) {
    return <p>No locations found.</p>;
  }

  return (
    <>
      <p>Found {numLocations} Locations:</p>
      <ul>
        {artifact?.features.map((f) => (
          <li key="f.id">{f.properties.name}</li>
        ))}
      </ul>
      <Button
        type="button"
        size="xs"
        borderRadius="full"
        colorPalette="blue"
        onClick={() => setMapLayers(() => [artifact])}
      >
        Show on map
      </Button>
    </>
  );
}

LocationTool.propTypes = {
  artifact: T.object
};

function DistAlertsTool({message, artifact}) {
  // message is of the form { "location": { "category": "value"}, { "category": "value"} }
  // artifact is geojson object to render to a map

  const setMapLayers = useSetAtom(mapLayersAtom);

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
      <Button size="xs" mt="4" onClick={() => setMapLayers(() => [artifact])}>Show on map</Button>
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
    <MessageOutWrapper>
      {render}
    </MessageOutWrapper>
  );
}

MessageTool.propTypes = {
  message: T.string.isRequired,
  toolName: T.oneOf(["context-layer-tool", "location-tool", "dist-alerts-tool", "retrieve_blog_posts"]),
  artifact: T.object
};


export default MessageTool;
