import "maplibre-gl/dist/maplibre-gl.css";
import T from "prop-types";
import MapGl, { Layer, Source } from "react-map-gl/maplibre";
import { useState, useEffect } from "react";
import { AttributionControl } from "react-map-gl";
import bbox from "@turf/bbox";
import { mapLayersAtom } from "../atoms";
import { useAtomValue } from "jotai";

/**
 * Map component
 * Children are the layers to render on the map
 */
function Map() {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0
  });

  const mapLayers = useAtomValue(mapLayersAtom);

  // if there are layers, calculate the bounds
  // each layer is a feature collection, so we need to calculate the bounds of all features
  useEffect(() => {
    if (mapLayers.length > 0) {
      const bounds = mapLayers.reduce((acc, layer) => {
        const layerBounds = bbox(layer);
        return [
          Math.min(acc[0], layerBounds[0]),
          Math.min(acc[1], layerBounds[1]),
          Math.max(acc[2], layerBounds[2]),
          Math.max(acc[3], layerBounds[3])
        ];
      }, [Infinity, Infinity, -Infinity, -Infinity]);

      setViewState({
        longitude: (bounds[0] + bounds[2]) / 2,
        latitude: (bounds[1] + bounds[3]) / 2,
        zoom: 12
      });
    }
  }, [mapLayers]);

  return (
    <MapGl
      initialViewState={viewState}
      {...viewState}
      attributionControl={false}
      onMove={(event) => setViewState(event.viewState)}
    >
      <Source
        id="background"
        type="raster"
        tiles={["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]}
        tileSize={256}
      >
        <Layer id="background-tiles" type="raster" />
      </Source>
        {mapLayers.map((layer) => (
          <Source id={`layer-${layer.id}`} type="geojson" data={layer} key={layer.id}>
            <Layer id={`layer-${layer.id}`} type="line" paint={{ "line-color": "#ff0000", "line-width": 2 }} />
          </Source>
        ))}
      <AttributionControl customAttribution="Background tiles: © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>" />
    </MapGl>
  );
}

Map.propTypes = {
  children: T.node
};

export default Map;
