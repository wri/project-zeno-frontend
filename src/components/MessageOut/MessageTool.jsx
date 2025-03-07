import T from "prop-types";
import MessageOutWrapper from "./wrapper";

import { useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { useSetAtom } from "jotai";
import {
  chartDataAtom,
  dataPaneTabAtom,
  addLayerAtom,
  recentImageryAtom
} from "../../atoms";
import InsightsSelect from "./InsightsSelect";
import { List } from "@chakra-ui/react";

function ContextLayer({ message, artifact }) {
  const addLayer = useSetAtom(addLayerAtom);
  useEffect(() => {
    if (artifact?.tms_url) {
      addLayer({
        id: "context-layer",
        type: "TMS",
        url: artifact.tms_url,
        name: artifact?.name,
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
      <List.Root as="ol" my="2">
        {artifact?.map((f) => {
          const regionName = f.properties?.mapbox_context?.region?.name;
          const adminLevel = f.properties?.admin_level
            ? ` (${f.properties.admin_level})`
            : "";
          const locationName = f.properties.name;
          // dont show repeated region name if it is the same as location name and use admin level to disambiguate
          return (
            <List.Item key={f.id}>
              {regionName && locationName !== regionName
                ? `${locationName}, ${regionName}`
                : `${locationName}${adminLevel}`}
            </List.Item>
          );
        })}
      </List.Root>
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
  const setDataPaneTab = useSetAtom(dataPaneTabAtom);

  useEffect(() => {
    try {
      const json = JSON.parse(message);
      const numDisturbances = Object.keys(json).length;
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


      if (numDisturbances > 0) {
        addLayer(layer);
        setChartData(data);
        setDataPaneTab("chart");
      }

    } catch (e) {
      console.error("Failed to parse message", e);
    }
  }, [message, addLayer, artifact, setChartData, setDataPaneTab]);

  try {
    const json = JSON.parse(message);
    const numDisturbances = Object.keys(json).length;

    if (numDisturbances > 0) {
      return (
        <>Adding alerts to the map.</>
      );
    }
    else {
      return (
        <>No alerts found.</>
      );
    }

    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return (
      <Alert status="error" title="Error">
        There was a problem processing your request. Please try again or try another prompt;
      </Alert>
    );
  }
}

DistAlertsTool.propTypes = {
  message: T.string.isRequired,
  artifact: T.object,
};

/**
 * Takes in a STAC message for recent satellite imagery
 *
 */
function StacTool({ message }) {
  const [render, setRender] = useState("");
  const setRecentImagery = useSetAtom(recentImageryAtom);
  const setDataPaneTab = useSetAtom(dataPaneTabAtom);

  useEffect(() => {
    const recentImageryArray = JSON.parse(message);
    if (recentImageryArray.length > 0) {
      setRecentImagery(recentImageryArray);
      setDataPaneTab("imagery");
      setRender(<div>Added Recent Imagery to Data Pane</div>);
    } else {
      setRender(<div>No Recent Imagery</div>);
    }

  }, [message, setDataPaneTab, setRecentImagery]);

  return render;
}

StacTool.propTypes = {
  message: T.string.isRequired
};

function KBADataTool({ message, artifact }) {
  const addLayer = useSetAtom(addLayerAtom);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (artifact) {
        const parsedArtifact = JSON.parse(artifact);
        const layer = {
          id: "kba-layer",
          type: "geojson",
          data: parsedArtifact,
          name: "KBA Locations",
        };
        addLayer(layer);
      }
    } catch (e) {
      console.error("Failed to parse KBA data", e);
      setError("Failed to parse KBA data. Please try again.");
    }
  }, [artifact, addLayer]);

  if (error) {
    return (
      <Alert status="error" title="Error">
        {error}
      </Alert>
    );
  }
  const insight = {
    type: "map",
    title: "KBA Locations",
    data: artifact ? JSON.parse(artifact) : null,
    description: message
  };

  return <InsightsSelect data={`{"insights": [${JSON.stringify(insight)}]}`} />;
}

KBADataTool.propTypes = {
  message: T.string.isRequired,
  artifact: T.string,
};

function MessageTool({ message, toolName, artifact }) {
  let render;

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
    case "stac-tool":
      render = <StacTool message={message} artifact={artifact} />;
      break;
    case "kba-data-tool":
      render = <KBADataTool message={message} artifact={artifact} />;
      break;
    case "kba-timeseries-tool":
      render = <InsightsSelect data={`{"insights": [${message}]}`} />;
      break;
    case "kba-insights-tool":
      render = <InsightsSelect data={message} artifact={artifact} />;
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
    "stac-tool",
    "retrieve_blog_posts",
    "kba-insights-tool",
    "kba-timeseries-tool"
  ]),
  artifact: T.object,
};

export default MessageTool;
