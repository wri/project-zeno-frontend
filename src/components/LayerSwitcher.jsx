import { useAtom } from "jotai";
import { mapLayersAtom, layerVisibilityAtom } from "../atoms";
import { Button } from "@chakra-ui/react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";

function LayerSwitcher() {
  const [mapLayers] = useAtom(mapLayersAtom);
  const [layerVisibility, setLayerVisibility] = useAtom(layerVisibilityAtom);

  const toggleLayerVisibility = (layerId) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  return (
    <Box
      position="absolute"
      top="10px"
      right="10px"
      bg="white"
      p="4"
      borderRadius="md"
      boxShadow="md"
      zIndex="1000"
    >
      <Text fontSize="lg" fontWeight="bold" mb="4">Layers</Text>
      <VStack spacing="2" align="stretch">
        {mapLayers.map((layer, idx) => {
          const layerId = layer?.features[0]?.id || idx;
          const isVisible = layerVisibility[layerId] ?? true;

          return (
            <HStack key={layerId} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <Button
                onClick={() => toggleLayerVisibility(layerId)}
                style={{
                  marginRight: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {isVisible ? "👁" : "🚫"}
              </Button>
              <Text fontSize="sm" flex="1">{layer.name}</Text>
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
}

export default LayerSwitcher;
