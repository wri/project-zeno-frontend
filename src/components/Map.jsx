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
import { mapLayersAtom, highlightedLocationAtom, confirmedLocationAtom, layerVisibilityAtom } from "../atoms";
import { useAtomValue } from "jotai";
import LayerSwitcher from "./LayerSwitcher";
import { AbsoluteCenter, Code, Box } from "@chakra-ui/react";
import { HiOutlinePlusSmall } from "react-icons/hi2";

/**
 * Map component
 * Children are the layers to render on the map
 */
function Map() {
  const pink500 = config.theme.tokens.colors.pink["500"];
  const blue500 = config.theme.tokens.colors.blue["500"];
  const [mapCenter, setMapCenter] = useState([0,0]);
  const mapRef = useRef();

  const mapLayers = useAtomValue(mapLayersAtom);
  const highlightedLocation = useAtomValue(highlightedLocationAtom);
  const confirmedLocation = useAtomValue(confirmedLocationAtom);
  const layerVisibility = useAtomValue(layerVisibilityAtom);

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

  }, [mapLayers, highlightedLocation, confirmedLocation, pink500, blue500]);

  // Set on mousemove and on mouseleave events on the features to match highlightedLocation

  // mapLayers.forEach((layer, idx) => {
  //   const layerId = layer.name || idx;
  //   mapRef.current.on("mousemove", `fill-layer-${layerId}`, (e) => {
  //     if (e.features.length > 0 && e.features[0].properties.name) {
  //       setHighlightedLocation(e.features[0].properties.name);
  //     }
  //   });

  //   mapRef.current.on("mouseleave", `fill-layer-${layerId}`, () =>{
  //     setHighlightedLocation(null);
  //   });

  // });


  const onMapLoad = useCallback(() => {
    mapRef.current.on("moveend", () => {
      setMapCenter(mapRef.current.getCenter().toArray());
    });
  }, [mapRef]);

  return (
    <Box position="relative" height="88vh">
    <MapGl
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 0
      }}
      onLoad={onMapLoad}
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
      {mapLayers?.map((layer, idx) => {
        const layerId = layer.name || idx;
        const isVisible = layerVisibility[layerId] ?? true;

        return (
          <Source id={layerId} type="geojson" data={layer} key={layerId}>
            <Layer
              id={`fill-layer-${layerId}`}
              type="fill"
              paint={{ "fill-color": ["case", 
                ["all",
                  ["has", "name"],
                  ["==", ["get", "name"], highlightedLocation ?? null],
                ], pink500, blue500
              ]
              , "fill-opacity": [
                "case",
                ["all",
                  ["has", "name"],
                  ["==", ["get", "name"], highlightedLocation ?? null],
                ], 0.5, 0.25
                ] }}
              layout={{ visibility: isVisible ? "visible" : "none" }}
            />
            <Layer
              id={`line-layer-${layerId}`}
              type="line"
              paint={{ "line-color": ["case", 
                ["all",
                  ["has", "name"],
                  ["==", ["get", "name"], highlightedLocation ?? null],
                ], pink500, blue500 
              ], "line-width": 2 }}
              layout={{ visibility: isVisible ? "visible" : "none" }}
            />
          </Source>
        );
      }
      )}
      <AttributionControl customAttribution="Background tiles: © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>" />
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
        lat, lon: {mapCenter[1].toFixed(3)}, {mapCenter[0].toFixed(3)}
      </Code>
    </MapGl>
    <LayerSwitcher />
    </Box>
  );
}

export default Map;
