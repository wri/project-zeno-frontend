import T from "prop-types";
import { Tabs, Flex, Heading } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "./ui/accordion";

const panelHeight = "20rem";

function TabbedPanel({ tabData }) {
  if (!tabData) return;
  return (
    <AccordionRoot
      bg="white"
      p="0"
      plain
      collapsible
      borderRadius="lg"
      shadow="md"
      overflow="auto"
      maxH={panelHeight}
    >
      <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1" variant="line">
        <AccordionItem
          css={{
            "&[data-scope=\"accordion\"][data-state=\"closed\"]  [data-scope=\"tabs\"]":
              { borderColor: "transparent", borderWidth: "0" },
            "&[data-scope=\"accordion\"][data-state=\"closed\"] [data-scope=\"tabs\"][aria-selected=true][data-selected][data-orientation=horizontal]":
              {"--indicator-color": "transparent" },
          }}
        >
          <Flex>
            <Tabs.List flex="1">
              {tabData.map((tab) => {
                return (
                  <Tabs.Trigger key={tab.value} value={tab.value}>
                    {tab.title}
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>
            <AccordionItemTrigger
              px={4}
              maxW="fit-content"
              cursor="pointer"
              borderRadius="0"
            />
          </Flex>
          <AccordionItemContent p={0} pb={2}>
            {tabData.map((tab) => {
              return (
                <Tabs.Content key={tab.value} value={tab.value} px={4} maxH={`calc(${panelHeight} - 6rem)`}>
                  <Heading as="h4" fontSize="sm">
                    {tab.title}
                  </Heading>
                  {tab.component}
                </Tabs.Content>
              );
            })}
          </AccordionItemContent>
        </AccordionItem>
      </Tabs.Root>
    </AccordionRoot>
  );
}

TabbedPanel.propTypes = {
  tabData: T.object,
};

export default TabbedPanel;
