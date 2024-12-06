import T from "prop-types";
import MapGl, { Layer, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";
import { AttributionControl } from "react-map-gl";

function Map({ artifact, mini }){
  const isStatic = mini; // if mini is true, the map is static
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
      touchPitch={!isStatic}
      touchZoom={!isStatic}
      dragRotate={!isStatic}
      scrollZoom={!isStatic}
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
      <AttributionControl customAttribution={mini ? "OSM contributors" : "Background tiles: © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"} />
    </MapGl>
  );
}

Map.propTypes = {
  artifact: T.object,
  mini: T.bool
};

export default Map;
