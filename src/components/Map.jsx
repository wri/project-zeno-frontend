import "maplibre-gl/dist/maplibre-gl.css";
import MapGl, { Layer, Source, AttributionControl } from "react-map-gl/maplibre";
import { useEffect } from "react";
import bbox from "@turf/bbox";
import { mapLayersAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { useRef } from "react";

/**
 * Map component
 * Children are the layers to render on the map
 */
function Map() {
  const mapRef = useRef();

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

      mapRef.current.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], {
        padding: 100
      });
    }
  }, [mapLayers]);

  return (
    <MapGl
      ref={mapRef}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 0
      }}
      attributionControl={false}
    >
      <Source
        id="background"
        type="raster"
        tiles={["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]}
        tileSize={256}
      >
        <Layer id="background-tiles" type="raster" />
      </Source>
        {mapLayers.map((layer, idx) => {
          const layerId = layer?.features[0]?.id || idx; 
          return (
            <Source id={layerId} type="geojson" data={layer} key={layerId}>
              <Layer id={layerId} type="line" paint={{ "line-color": "#ff0000", "line-width": 2 }} />
            </Source>
          );
        })}
      <AttributionControl customAttribution="Background tiles: © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>" />
    </MapGl>
  );
}

export default Map;
