import T from "prop-types";
import { Box, Text } from "@chakra-ui/react";
import MapGl, { Layer, Source, AttributionControl, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";
import { useColorModeValue } from "../ui/color-mode";
import { useState } from "react";
import { Alert } from "../ui/alert";

export default function MapWidget({ data, description }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [error, setError] = useState(null);

  let viewState = {
    longitude: 0,
    latitude: 0,
    zoom: 0
  };

  if (data) {
    try {
      const bounds = bbox(data);
      viewState = {
        bounds: [
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]]
        ],
        fitBoundsOptions: {
          padding: 50
        }
      };
    } catch (e) {
      console.error("Error calculating bounds:", e);
      setError("Error calculating map bounds");
    }
  }

  const onMapClick = (event) => {
    if (!data) return;

    try {
      const feature = event.features[0];
      if (feature) {
        const siteName = feature.properties?.siteName;
        if (siteName) {
          setPopupInfo({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
            siteName
          });
        }
      } else {
        setPopupInfo(null);
      }
    } catch (e) {
      console.error("Error handling map click:", e);
      setError("Error displaying site information");
    }
  };


  return (
    <Box
      position="relative"
      height="calc(100% - 5rem)"
      p="6"
      css={{
        _dark: {
          "& .maplibregl-ctrl-scale": {
            bgColor: "black/20",
            color: "fg",
            borderColor: "bg.muted",
          },
          "& .maplibregl-ctrl.maplibregl-ctrl-attrib": {
            bgColor: "black/40",
            "& a": { color: "fg" },
          },
          "& .maplibregl-ctrl-group": {
            bg: "bg",
            color: "fg",
            boxShadow: "lg",
            boxShadowColor: "white",
            "& button": {
              "&+button": { borderColor: "border.emphasized" },
              "&:not(:disabled):hover": {
                bgColor: "bg.emphasized",
                color: "fg",
              },
              "& .maplibregl-ctrl-icon": {
                filter: "invert(1)",
              }
            },
          },
        },
      }}
    >
      {error && (
        <Alert
          status="error"
          title="Error"
          position="absolute"
          top={4}
          left={0}
          right={0}
          zIndex={1}
          width="90%"
          margin="auto"
          closable
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      <MapGl
        initialViewState={viewState}
        style={{ width: "100%", height: "100%", minHeight: "500px" }}
        attributionControl={false}
        interactiveLayerIds={["fill-layer", "line-layer"]}
        onClick={onMapClick}
      >
        <Source
          id="background"
          type="raster"
          tiles={[useColorModeValue(
            "https://api.mapbox.com/styles/v1/devseed/cm4sj2dh6005b01s80c8t623r/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q",
            "https://api.mapbox.com/styles/v1/devseed/clz35cbi302l701qo2snhdx9x/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q"
          )]}
          tileSize={256}
        >
          <Layer id="background-tiles" type="raster" />
        </Source>
        {data && (
          <Source id="data" type="geojson" data={data}>
            <Layer
              id="fill-layer"
              type="fill"
              paint={{
                "fill-color": "#1857e0",
                "fill-opacity": 0.25
              }}
            />
            <Layer
              id="line-layer"
              type="line"
              paint={{
                "line-color": "#1857e0",
                "line-width": 2
              }}
            />
          </Source>
        )}
        <AttributionControl customAttribution="© OpenStreetMap contributors" position="bottom-left" />
        <NavigationControl showCompass={false} position="bottom-left" />
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeButton={false}
            closeOnClick={true}
            closeOnMove={false}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
          >
            <Text fontWeight="bold">{popupInfo.siteName}</Text>
          </Popup>
        )}
      </MapGl>
      {description && <Text mt={4}>{description}</Text>}
    </Box>
  );
}

MapWidget.propTypes = {
  data: T.object,
  description: T.string
};
