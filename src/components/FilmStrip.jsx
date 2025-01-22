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

function ImageItem({ id }) {
  return (
    <Card.Root borderRadius="lg" overflow="hidden" width="12rem">
      <LinkOverlay href="#">
      <Image
        src={`https://picsum.photos/id/${id}/500/300`}
        alt="satellite image"
      />
      <Box
        bgGradient="to-b"
        gradientFrom="black/90"
        gradientTo="transparent"
        width="100%"
        pos="absolute"
        top={0}
        left={0}
      >
        <Card.Title left={2} pos="relative" color="white" fontSize="sm">
          20{id.toString().slice(0, 2)}
        </Card.Title>
      </Box>
      </LinkOverlay>
    </Card.Root>
  );
}

ImageItem.propTypes = {
  id: T.number,
};

const demoImages = [122, 433, 123, 453, 342, 541, 652, 345];

function FilmStrip() {
  return (
    <List.Root display="flex" listStyle="none" flexDir="row" my={2} mx={-4} gap={4} overflowX="scroll">
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
        {demoImages.map((id) => {
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
