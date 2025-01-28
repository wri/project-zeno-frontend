import T from "prop-types";
import MessageOutWrapper from "./wrapper";

import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import {
  chartDataAtom,
  dataPaneTabAtom,
  addLayerAtom,
  recentImageryAtom
} from "../../atoms";

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
  const setDataPaneTab = useSetAtom(dataPaneTabAtom);

  useEffect(() => {
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
  }, [message, addLayer, artifact, setChartData, setDataPaneTab]);

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
  ]),
  artifact: T.object,
};

export default MessageTool;
