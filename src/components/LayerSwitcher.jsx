import { useAtom } from "jotai";
import { mapLayersAtom, layerVisibilityAtom } from "../atoms";
import { Text, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../components/ui/accordion";
import {
  CollecticonEye,
  CollecticonEyeDisabled,
  CollecticonIsoStack,
} from "@devseed-ui/collecticons-react";
import { useColorModeValue } from "./ui/color-mode";

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
    <AccordionRoot
      position="absolute"
      top={4}
      left={4}
      bg={useColorModeValue("bg.panel", "bg.emphasized")}
      p="2"
      py="0"
      borderRadius="md"
      plain="true"
      collapsible
      boxShadow="md"
      zIndex="1000"
      maxW="16rem"
    >
      <AccordionItem border="none">
        <AccordionItemTrigger
          cursor="pointer"
          borderRadius="0"
          paddingInline="0.5rem"
          marginInline="-0.5rem"
          width="calc(100% + 1rem)"
          css={{
            "&[data-part=\"item-trigger\"][data-state=\"open\"]": {
              borderBottom: "1px solid",
              borderColor: useColorModeValue("bg.emphasized", "bg.panel"),
            }
          }}
        >
          <Flex gap={2} alignItems="center">
            <CollecticonIsoStack />
            <Heading size="sm" as="h4" m={0}>
              Layers
            </Heading>
          </Flex>
        </AccordionItemTrigger>
        <AccordionItemContent>
        {mapLayers.length === 0 && (
          <Text fontSize="xs" color="fg.muted">
            No layers available
          </Text>
          )}
        {mapLayers.length > 0 && (
          mapLayers.map((layer) => {
            const layerId = layer.id;
            const isVisible = layerVisibility[layerId] ?? true;
            return (
              <HStack key={layerId}>
                <Text fontSize="xs" flex="1">
                  {layer.name}
                </Text>
                <IconButton
                  onClick={() => toggleLayerVisibility(layerId)}
                  variant="plain"
                  size="xs"
                  minW={3}
                >
                  {isVisible ? (
                    <CollecticonEye size={16} />
                  ) : (
                    <CollecticonEyeDisabled size={16} />
                  )}
                </IconButton>
              </HStack>
            );
          }))}
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}

export default LayerSwitcher;
