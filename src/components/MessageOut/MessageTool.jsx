import T from "prop-types";
import MessageOutWrapper from "./wrapper";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { chartDataAtom, addLayerAtom } from "../../atoms";
import QueryButton from "./QueryButton";

function ContextLayer({ message, artifact }) {
  const addLayer = useSetAtom(addLayerAtom);
  useEffect(() => {
    if (artifact?.tms_url) {
      addLayer({
        id: "context-layer",
        type: "TMS",
        url: artifact.tms_url,
        name: "Context Layer",
        metadata: artifact.metadata
      });
    }
  }, [artifact, addLayer]);

  return (
    <p>
      Using context layer <b>{message}</b>
    </p>
  );
}

ContextLayer.propTypes = {
  message: T.string.isRequired,
  artifact: T.object
};

function LocationTool({ artifact }) {
  /**
   * LocationTool component
   * message is found location
   * artifact is geojson object to render to a map
   */
  const addLayer = useSetAtom(addLayerAtom);

  const numLocations = artifact ? artifact?.length : 0;

  useEffect(() => {
    const featureCollection = {
      type: "FeatureCollection",
      features: artifact,
    };
    const layer = {
      id: "location-layer",
      type: "geojson",
      data: featureCollection,
      name: "Location Layer",
    };
    if (numLocations > 0) {
      addLayer(layer);
    }

  }, [artifact, addLayer, numLocations]);


  if (numLocations === 0) {
    return <p>No locations found.</p>;
  }
  return (
    <>
      <p>Found {numLocations} Locations:</p>
      <ul>
        {artifact?.map((f) => (
          <li key={f.id}>{f.properties.name}</li>
        ))}
      </ul>
    </>
  );
}

LocationTool.propTypes = {
  artifact: T.object,
};

function DistAlertsTool({ message, artifact }) {
  // message is of the form { "category1": "value", "category2": "value" }
  // artifact is geojson object to render to a map

  const addLayer = useSetAtom(addLayerAtom);
  const setChartData = useSetAtom(chartDataAtom);

  const numDisturbances = artifact ? artifact?.features.length : 0;

  if (numDisturbances === 0) {
    return <p>No disturbances found in the region.</p>;
  }

  const json = JSON.parse(message);

  const data = Object.entries(json).map(([category, value]) => ({
    category,
    value,
  }));

  const layer = {
    id: "disturbances-layer",
    type: "geojson",
    data: artifact,
    name: "Disturbances",
  };

  return (
    <>
      <p>Found {numDisturbances} disturbances in the region.</p>
      <QueryButton
        clickHandler={() => {
          addLayer(layer);
          setChartData(data);
        }}
      >
        Display Data
      </QueryButton>
    </>
  );
}

DistAlertsTool.propTypes = {
  message: T.string.isRequired,
  artifact: T.object,
};

function MessageTool({ message, toolName, artifact }) {
  let render;

  console.log(message, toolName, artifact);

  switch (toolName) {
    case "context-layer-tool":
      render = <ContextLayer message={message} artifact={artifact} />;
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

  return <MessageOutWrapper>{render}</MessageOutWrapper>;
}

MessageTool.propTypes = {
  message: T.string.isRequired,
  toolName: T.oneOf([
    "context-layer-tool",
    "location-tool",
    "dist-alerts-tool",
    "retrieve_blog_posts",
  ]),
  artifact: T.object,
};

export default MessageTool;
