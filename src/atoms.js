import bbox from "@turf/bbox";
import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";

export const mapLayersAtom = atom([]);
export const highlightedLocationAtom = atom();
export const chatHistoryAtom = atom([]);
export const sessionIdAtom = atom(uuidv4());
export const isLoadingAtom = atom(false);
export const chartDataAtom = atom();
export const layerVisibilityAtom = atom({});
export const interruptedStateAtom = atom(false); // when we receive an interrupt from the API
export const dataPaneTabAtom = atom("");
export const recentImageryAtom = atom([]);
export const mapBoundsAtom = atom([-180, -90, 180, 90]);
export const showAudioButtonsAtom = atom(false);

function makeInputMessage(query) {
  return {
    type: "in",
    message: query,
    timestamp: Date.now()
  };
}

export const addPrompt = atom(null, (get, set, promt) => {
  const { queryType, query } = promt;

  if (queryType === "query") {
    set(chatHistoryAtom, (prev => [...prev, makeInputMessage(query)]));
  }

  let queryUrl = "https://api.zeno.ds.io/stream/dist_alert";
  if (import.meta.env.VITE_MOCK_QUERIES === "true") {
    queryUrl = "/stream";
  }

  set(isLoadingAtom, true);
  fetch(queryUrl, {
    method: "POST",
    headers:{"content-type": "application/json"},
    body: JSON.stringify({ query, query_type: queryType, thread_id: get(sessionIdAtom) })
  }).then(async (response) => {
    const utf8Decoder = new TextDecoder("utf-8");
    const reader = response.body.getReader();
    let { value: chunk, done: readerDone } = await reader.read();
    chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";

    let buffer = ""; // Accumulate partial chunks

    while (!readerDone) {
      buffer += chunk; // Append current chunk to buffer

      let lineBreakIndex;
      while ((lineBreakIndex = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, lineBreakIndex).trim(); // Extract the line
        buffer = buffer.slice(lineBreakIndex + 1); // Remove processed line

        if (line) {
          try {
            const message = {
              ...JSON.parse(line),
              timestamp: Date.now()
            };
            set(chatHistoryAtom, (prev) => [...prev, message]);
          } catch (err) {
            console.error("Failed to parse line", line, err);
          }
        }
      }

      // Read next chunk
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";
    }

    // Handle any remaining data in the buffer
    if (buffer.trim()) {
      try {
        const message = {
          ...JSON.parse(buffer),
          timestamp: Date.now()
        };
        set(chatHistoryAtom, (prev) => [...prev, message]);
      } catch (err) {
        console.error("Failed to parse final buffer", buffer, err);
      }
    }
  })
  .finally(() => set(isLoadingAtom, false));
});

/**
 * Adds a new layer to the map
 *
 */
export const addLayerAtom = atom(
  null, // No initial value for a write-only atom
  (get, set, newLayer) => {
    const layerId = newLayer.id || uuidv4();

    // Update `mapLayersAtom`
    set(mapLayersAtom, (prevLayers) => {
      const existingIndex = prevLayers.findIndex(
        (l) => (l?.id || null) === layerId
      );

      if (existingIndex !== -1) {
        // Update existing layer
        const updatedLayers = [...prevLayers];
        updatedLayers[existingIndex] = newLayer;
        return updatedLayers;
      }

      // Add new layer
      return [...prevLayers, newLayer];
    });

    // Update `layerVisibilityAtom` to ensure visibility is set
    set(layerVisibilityAtom, (prevVisibility) => ({
      ...prevVisibility,
      [layerId]: true, // Default visibility to true for new layers
    }));
  
    set(mapBoundsAtom, (prevBounds) => calculateNewBounds(get(mapLayersAtom), prevBounds));
  }
  
);

/**
 * Confirming a location takes a gid
 * and sets the location layer featurecollection in the mapLayers atom to only have one
 * feature with that gid
 */
export const confirmLocationAtom = atom(
  null,
  (get, set, gid) => {
    const locationLayer = get(mapLayersAtom).find((l) => l.id === "location-layer");

    if (!locationLayer) {
      console.error("No location layer found");
      return;
    }

    const feature = locationLayer?.data.features.find((f) => f.properties.gadm_id === gid);

    if (!feature) {
      console.error("No feature found with gid", gid);
      return;
    }

    const newLayer = {
      ...locationLayer,
      data: {
        type: "FeatureCollection",
        features: [feature],
      },
    };

    set(mapLayersAtom, (prevLayers) => {
      const locationLayerIndex = prevLayers.findIndex((l) => l.id === "location-layer");
      const updatedLayers = [...prevLayers];
      updatedLayers[locationLayerIndex] = newLayer;
      return updatedLayers;
    });

    set(mapBoundsAtom, (prevBounds) => calculateNewBounds(get(mapLayersAtom), prevBounds));
  }
);

function calculateNewBounds(mapLayers, prevBounds) {
  try {
  return mapLayers.reduce(
    (acc, layer) => {
      if (layer.type == "geojson") {
        const layerBounds = bbox(layer.data);
        return [
          Math.min(acc[0], layerBounds[0]),
          Math.min(acc[1], layerBounds[1]),
          Math.max(acc[2], layerBounds[2]),
          Math.max(acc[3], layerBounds[3]),
        ];
      } else {
        return acc;
      }
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  } catch (e) {
    console.error("Failed to calculate new bounds", e);
    return prevBounds;
  }
}
