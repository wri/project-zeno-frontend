import T from "prop-types";
import MapGl, { Layer, Source, AttributionControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";

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
        tiles={["https://api.mapbox.com/styles/v1/devseed/cm4sj2dh6005b01s80c8t623r/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q"]}
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
          <Layer
            id="fill-layer"
            type="fill"
            paint={{ "fill-color": "#1857e0", "fill-opacity": 0.25 }}
          />
          <Layer
            id="line-layer"
            type="line"
            paint={{ "line-color": "#1857e0", "line-width": 2 }}
          />
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
