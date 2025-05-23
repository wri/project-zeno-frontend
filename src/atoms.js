import bbox from "@turf/bbox";
import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";

// --- Authentication Atoms ---
const WRI_TOKEN_KEY = "wriToken";

// Atom to manage the token state and sync with localStorage
export const authTokenAtom = atom(
  localStorage.getItem(WRI_TOKEN_KEY),
  (get, set, token) => {
    if (token) {
      localStorage.setItem(WRI_TOKEN_KEY, token);
      set(authTokenAtom, token);
    } else {
      localStorage.removeItem(WRI_TOKEN_KEY);
      set(authTokenAtom, null);
    }
  }
);

// Subscribe to storage events to sync across tabs/windows
authTokenAtom.onMount = (setAtom) => {
  const handler = (e) => {
    if (e.key === WRI_TOKEN_KEY) {
      // Update the atom's state based on the storage change
      setAtom(e.newValue); // Note: e.newValue is null if item is removed
    }
  };

  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("storage", handler);
  };
};

// Derived atom for checking authentication status
export const isAuthenticatedAtom = atom((get) => !!get(authTokenAtom));

// Derived atom to get the user's email from the JWT payload
export const currentUserEmailAtom = atom((get) => {
  const token = get(authTokenAtom);
  if (!token) {
    return null; // No token, no email
  }
  try {
    const decoded = jwtDecode(token); // Decode the token
    // Adjust the property access based on the actual JWT structure
    // Common properties are 'email', 'sub', 'name', etc.
    return decoded?.email || null; // Return email or null if not found
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    // If decoding fails (invalid token), treat as unauthenticated
    return null;
  }
});

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
export const currentUserPersonaAtom = atom("");
export const insightsAtom = atom([]);
export const sidePanelContentAtom = atom(null);
export const reportContentAtom = atom([]);

export const addToReportAtom = atom(
  (get) => get(reportContentAtom), (get, set, data) => {
    set(reportContentAtom, (prev) => [...prev, data]);
  });

export const deleteFromReportAtom = atom(null, (get, set, title) => {
  set(reportContentAtom, (prev) => prev.filter((item) => item.title !== title));
});

export const currentAppTypeAtom = atom("alerting");

function makeInputMessage(query) {
  return {
    type: "in",
    message: query,
    timestamp: Date.now()
  };
}

const API_DOMAIN = "https://api.zeno.ds.io";

const appURLs = {
  "alerting": `${API_DOMAIN}/stream/dist_alert`,
  "monitoring": `${API_DOMAIN}/stream/kba`
};

export const addInsightsAtom = atom((get) => get(insightsAtom), (get, set, insights) => {
  set(insightsAtom, (prev) => {
    if (!prev) return insights;
    return [
      ...prev,
      ...insights.filter((insight) => !prev.some((p) => p.title === insight.title))
    ];
  });
});

export const addPrompt = atom(null, (get, set, prompt) => {
  const appType = get(currentAppTypeAtom);
  const userPersona = get(currentUserPersonaAtom);
  const { queryType, query } = prompt;

  if (queryType === "query") {
    set(chatHistoryAtom, (prev => [...prev, makeInputMessage(query)]));
  }

  let queryUrl = appURLs[appType];

  if (import.meta.env.VITE_MOCK_QUERIES === "true") {
    queryUrl = "/stream";
  }

  let queryToSend = {
    query,
    query_type: queryType,
    thread_id: get(sessionIdAtom),
  };
  if (userPersona) {
    queryToSend.user_persona = userPersona;
  }

  set(isLoadingAtom, true);
  fetch(queryUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${get(authTokenAtom)}`
    },
    body: JSON.stringify(queryToSend)
  }).then(async (response) => {
    if (!response.ok) {
      if (response.status === 401) {
        set(chatHistoryAtom, (prev) => [...prev, {
          type: "error",
          message: "Authentication failed. Please log in again.",
          timestamp: Date.now()
        }]);
        set(authTokenAtom, null); // Clear the invalid token
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
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
