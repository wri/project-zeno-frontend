import T from "prop-types";
import MapGl, { Layer, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";
import { AttributionControl } from "react-map-gl";

/**
 * MiniMap is a static map for the sidebar 
 */
function MiniMap({ artifact }){
  let viewState = {
    longitude: 0,
    latitude: 0,
    zoom: 0
  };

  if (artifact) {
    const bounds = bbox(artifact);
    viewState = {
      longitude: (bounds[0] + bounds[2]) / 2,
      latitude: (bounds[1] + bounds[3]) / 2,
      zoom: 12
    };
  }

  return (
    <MapGl
      initialViewState={viewState}
      touchPitch={false}
      touchZoom={false}
      dragRotate={false}
      scrollZoom={false}
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
      {artifact && (
        <Source
          id="artifact"
          type="geojson"
          data={artifact}
        >
          <Layer id="artifact-layer" type="line" paint={{ "line-color": "#ff0000", "line-width": 2 }} />
        </Source>
      )}
      <AttributionControl customAttribution="OSM contributors" />
    </MapGl>
  );
}

MiniMap.propTypes = {
  artifact: T.object,
};

export default MiniMap;
