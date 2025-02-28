import { Suspense } from "react";
import T from "prop-types";
import {
  Box,
  Card,
  Image,
  LinkOverlay,
  List,
  ListItem,
  Skeleton,
} from "@chakra-ui/react";
import { recentImageryAtom, addLayerAtom } from "../atoms";
import { useAtomValue, useSetAtom } from "jotai";

const titiler = (id) =>
  `https://titiler.xyz/stac/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/${id}&assets=red&assets=green&assets=blue&rescale=0%2C2000`;

function ImageItem({ id }) {
  const addLayer = useSetAtom(addLayerAtom);
  const layer = {
    "id": "satellite-layer",
    "type": "TMS",
    "url": `${titiler(id)}`,
    "name": "Sentinel-2",
  };
  const parseDateFromId = (str) => {
    // Extract the date from the STAC id (YYYYMMDD) using a regex
    const match = str.match(/\d{8}/);
    if (match) {
      const dateStr = match[0]; // e.g., '20230827'
      const year = dateStr.slice(0, 4); // YYYY
      const month = dateStr.slice(4, 6); // MM
      const day = dateStr.slice(6, 8); // DD
      const instrument = str.split("_")[0]; // e.g., 'S2A'
      const instrumentSring = instrument === "S2A" || instrument === "S2B" ? `(${instrument}) ` : "";
  
      // Create a Date object and format it
      const date = new Date(`${year}-${month}-${day}`);
      return instrumentSring + date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); // e.g., "August 27, 2023"
    }
    return str; // Return original id match is found
  };
  return (
    <Card.Root borderRadius="lg" overflow="hidden" width="12rem" height="8rem" role="button">
      <LinkOverlay onClick={() => addLayer(layer)} cursor="pointer">
      <Image
        src={`https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/${id}/thumbnail`}
        alt="satellite image"
      />
      <Box
        bgGradient="to-b"
        gradientFrom="black/90"
        gradientTo="transparent"
        width="100%"
        height="100%"
        pos="absolute"
        top={0}
        left={0}
      >
        <Card.Title left={2} pos="relative" color="white" fontSize="xs">
          {parseDateFromId(id)}
        </Card.Title>
      </Box>
      </LinkOverlay>
    </Card.Root>
  );
}

ImageItem.propTypes = {
  id: T.string,
};

function FilmStrip() {
  const recentImages = useAtomValue(recentImageryAtom);
  return (
    <List.Root display="flex" listStyle="none" flexDir="row" px="0" mt="2" pb="2" gap={4} overflowX="scroll">
      <Suspense
        fallback={
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <ListItem key={i} minW="fit-content">
                <Skeleton height="8rem" width="12rem" borderRadius="md" />
              </ListItem>
            ))}
          </>
        }
      >
        {recentImages.map((id) => {
          return (
            <List.Item key={id}>
              <ImageItem id={id} alt={id} />
            </List.Item>
          );
        })}
      </Suspense>
    </List.Root>
  );
}

export default FilmStrip;
