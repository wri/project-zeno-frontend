import "maplibre-gl/dist/maplibre-gl.css";
import MapGl, {
  Layer,
  Source,
  AttributionControl,
  NavigationControl,
  ScaleControl
} from "react-map-gl/maplibre";
import { config } from "../theme";
import { useEffect, useState, useRef, useCallback } from "react";
import bbox from "@turf/bbox";
import { mapLayersAtom, highlightedLayerAtom, confirmedLocationAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { AbsoluteCenter, Code } from "@chakra-ui/react";
import { HiOutlinePlusSmall } from "react-icons/hi2";

/**
 * Map component
 * Children are the layers to render on the map
 */
function Map() {
  const pink500 = config.theme.tokens.colors.pink["500"];
  const blue500 = config.theme.tokens.colors.blue["500"];
  const [currentFeatures, setFeatures] = useState([]);
  const [mapCenter, setMapCenter] = useState([0,0]);
  const mapRef = useRef();

  const mapLayers = useAtomValue(mapLayersAtom);
  const highlightedLayer = useAtomValue(highlightedLayerAtom);
  const confirmedLocation = useAtomValue(confirmedLocationAtom);

  // if there are layers, calculate the bounds
  // each layer is a feature collection, so we need to calculate the bounds of all features
  useEffect(() => {
    if (mapLayers.length > 0) {
      if (!confirmedLocation) {
        const bounds = mapLayers.reduce(
          (acc, layer) => {
            const layerBounds = bbox(layer);
            return [
              Math.min(acc[0], layerBounds[0]),
              Math.min(acc[1], layerBounds[1]),
              Math.max(acc[2], layerBounds[2]),
              Math.max(acc[3], layerBounds[3]),
            ];
          },
          [Infinity, Infinity, -Infinity, -Infinity]
        );

        mapRef.current.fitBounds(
          [
            [bounds[0], bounds[1]],
            [bounds[2], bounds[3]],
          ],
          {
            padding: 100,
          }
        );
      } else {
        // If the location is confirmed, fit to the bounds of the confirmed location
        const bounds = bbox(confirmedLocation);
        mapRef.current.fitBounds(
          [
            [bounds[0], bounds[1]],
            [bounds[2], bounds[3]],
          ],
          {
            padding: 100,
          }
        );
      }
    }

    mapLayers.forEach(layer => layer.features.forEach(
      ((feature) => {
        if (feature.id === highlightedLayer) {
          // add highlight layer to attributes
          feature.properties = {
            ...feature.properties,
            "fill-opacity": 0.5,
            "fill-color": pink500,
            "line-color": pink500,
          };
        } else {
          // reset the layer to default
          feature.properties = {
            ...feature.properties,
            "fill-opacity": 0.25,
            "fill-color": blue500,
            "line-color": blue500,
          };
        }
    })));
    setFeatures(mapLayers.reduce((acc, layer) => [...acc, ...layer.features], []));
  }, [mapLayers, highlightedLayer, confirmedLocation, pink500, blue500]);

  const onMapLoad = useCallback(() => {
    mapRef.current.on("move", () => {
      setMapCenter(mapRef.current.getCenter().toArray());
    });
  }, [mapRef]);

  return (
    <MapGl
      ref={mapRef}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 0
      }}
      onMove={onMapLoad}
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
      {currentFeatures?.map((feature, idx) => {
          const layerId = feature.id || idx;
          const fillColor = feature.properties["fill-color"] || blue500;
          const lineColor = feature.properties["line-color"] || blue500;
          const fillOpacity = feature.properties["fill-opacity"] || 0.25;

          return (
            <Source id={layerId} type="geojson" data={feature} key={layerId}>
              <Layer
                id={`fill-layer-${layerId}`}
                type="fill"
                paint={{ "fill-color": fillColor , "fill-opacity": fillOpacity }}
              />
              <Layer
                id={`line-layer-${layerId}`}
                type="line"
                paint={{ "line-color": lineColor, "line-width": 2 }}
              />
            </Source>
          );
        })};
      <AttributionControl customAttribution="Background tiles: © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>" position="bottom-left" />
      <ScaleControl />
      <AbsoluteCenter
        fontSize="sm"
      >
        <HiOutlinePlusSmall />
      </AbsoluteCenter>
      <NavigationControl showCompass={false} position="bottom-left" />
      <Code
        pos="absolute"
        bottom="0"
        right="0"
        p="2"
        borderRadius={8}
        fontSize="10px"
        bg="whiteAlpha.600"
        boxShadow="md"
      >
        lat, lon: {mapCenter[0].toFixed(3)}, {mapCenter[1].toFixed(3)}
      </Code>
    </MapGl>
  );
}

export default Map;
