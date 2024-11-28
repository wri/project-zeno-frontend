import MapGl, { Layer, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";


function Map() {
  return (
    <MapGl
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 0
      }}
    >
      <Source
        id="background"
        type="raster"
        tiles={["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]}
        tileSize={256}
        attribution="Background tiles: © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
      >
        <Layer id="background-tiles" type="raster" />
      </Source>
    </MapGl>
  );
}

export default Map;
