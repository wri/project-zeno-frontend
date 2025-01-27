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
import { mapLayersAtom, highlightedLocationAtom, layerVisibilityAtom, mapBoundsAtom } from "../atoms";
import { useAtomValue } from "jotai";
import LayerSwitcher from "./LayerSwitcher";
import { AbsoluteCenter, Code, Box } from "@chakra-ui/react";
import { HiOutlinePlusSmall } from "react-icons/hi2";

const addTMSLayer = (map, layerId, url, visibility = true) => {
  // Check if the layer already exists (avoid duplicates)
  if (map.getSource(layerId))  {
    // set the visibility of the layer
    map.getSource(layerId).tiles = [url];
    map.setLayoutProperty(`tms-layer-${layerId}`, "visibility", visibility ? "visible" : "none");
    return;
  }

  // Find the first GeoJSON layer ID
  const layers = map.getStyle().layers;
  const firstGeoJSONLayer = layers.find((layer) =>
    layer.id.startsWith("fill-layer-")
  );

  const beforeId = firstGeoJSONLayer ? firstGeoJSONLayer.id : undefined;

  // Add the TMS source
  map.addSource(layerId, {
    type: "raster",
    tiles: [url],
    tileSize: 256,
  });

  // Add the TMS layer with the calculated beforeId
  map.addLayer(
    {
      id: `tms-layer-${layerId}`,
      type: "raster",
      source: layerId,
      layout: { visibility: visibility ? "visible" : "none" },
    },
    beforeId // Insert below the first GeoJSON layer
  );
};

/**
 * Map component
 * Children are the layers to render on the map
 */
function Map() {
  const pink500 = config.theme.tokens.colors.pink["500"];
  const blue500 = config.theme.tokens.colors.blue["500"];
  const berenjena500 = config.theme.tokens.colors.berenjena["500"];
  const [mapCenter, setMapCenter] = useState([0,0]);
  const mapRef = useRef();

  const mapLayers = useAtomValue(mapLayersAtom);
  const highlightedLocation = useAtomValue(highlightedLocationAtom);
  const layerVisibility = useAtomValue(layerVisibilityAtom);
  const mapBounds = useAtomValue(mapBoundsAtom);

  // if there are layers, calculate the bounds
  // each layer is a feature collection, so we need to calculate the bounds of all features
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    if (mapLayers.length > 0) {
      // Dynamically add map layers
      mapLayers.forEach((layer, idx) => {
        const layerId = layer.id || idx;
        const isVisible = layerVisibility[layerId] ?? true;

        if (layer.type === "geojson") {
          if (map.getSource(layerId)) {
            map.getSource(layerId).setData(layer.data); // refresh the data
          }
          else {
            map.addSource(layerId, {
              type: "geojson",
              data: layer.data,
            });

            // Add the fill layer
            map.addLayer(
              {
                id: `fill-layer-${layerId}`,
                type: "fill",
                source: layerId,
              },
            );

            // Add the line layer
            map.addLayer(
              {
                id: `line-layer-${layerId}`,
                type: "line",
                source: layerId,
                paint: {
                  "line-width": 2
                },
              },
            );
          }

            // set the visibility of the layer
            map.setLayoutProperty(`fill-layer-${layerId}`, "visibility", isVisible ? "visible" : "none");
            map.setLayoutProperty(`line-layer-${layerId}`, "visibility", isVisible ? "visible" : "none");

            // set paint properties
            map.setPaintProperty(`fill-layer-${layerId}`, "fill-color", ["case", 
                    ["all",
                      ["has", "gadm_id"],
                      ["==", ["get", "gadm_id"], highlightedLocation ?? null],
                    ], pink500, blue500
                  ]);
            map.setPaintProperty(`fill-layer-${layerId}`, "fill-opacity", [
                    "case",
                    ["all",
                      ["has", "gadm_id"],
                      ["==", ["get", "gadm_id"], highlightedLocation ?? null],
                    ], 0.5, 0.25
                  ]);
            map.setPaintProperty(`line-layer-${layerId}`, "line-color", ["case",
                    ["all",
                      ["has", "gadm_id"],
                      ["==", ["get", "gadm_id"], highlightedLocation ?? null],
                    ], pink500, blue500
                  ]
            );
        }
        // set different paint properties for the disturbances layer
        if (layer.id === "disturbances-layer") {
          map.setPaintProperty("fill-layer-disturbances-layer", "fill-color", berenjena500);
          map.setPaintProperty("fill-layer-disturbances-layer", "fill-opacity", 0.5, 0.25);
          map.setPaintProperty("line-layer-disturbances-layer", "line-color", berenjena500);
        }
        if (layer.type === "TMS") {
          // Add or update TMS layer
          addTMSLayer(map, layerId, layer.url, isVisible);

        }
      });

    }

  }, [mapLayers, highlightedLocation, pink500, blue500, layerVisibility]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.fitBounds(
      [
        [mapBounds[0], mapBounds[1]],
        [mapBounds[2], mapBounds[3]],
      ],
      {
        padding: 100,
      }
    );
  }, [mapBounds]);

  const onMapLoad = useCallback(() => {
    mapRef.current.on("moveend", () => {
      if (!mapRef.current) return;
      if (!mapRef.current.getCenter) return;
      setMapCenter(mapRef.current.getCenter().toArray());
    });
  }, [mapRef]);

  return (
    <Box position="relative" height="100%">
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
          lat, lon: {mapCenter[1].toFixed(3)}, {mapCenter[0].toFixed(3)}
        </Code>
      </MapGl>
      <LayerSwitcher />
    </Box>
  );
}

export default Map;
