import { useEffect, useState } from "react";
import T from "prop-types";
import { Collapsible, Tabs, Flex, Heading, Icon } from "@chakra-ui/react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useAtom } from "jotai";
import { dataPaneTabAtom } from "../atoms";

const panelHeight = "20rem";

function TabbedPanel({ tabData }) {
  const [dataPaneTab, setDataPaneTab] = useAtom(dataPaneTabAtom);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(!!dataPaneTab);
  }, [dataPaneTab]);

  if (!tabData) return;
  return (
    <Collapsible.Root
      bg="white"
      p="0"
      plain="true"
      borderRadius="lg"
      shadow="md"
      maxH={panelHeight}
      open={isOpen}
      onOpenChange={() => setIsOpen(prev => !prev)}
    >
      <Tabs.Root
        display={isOpen ? "grid" : "block"}
        gridTemplateRows="max-content 300px"
        lazyMount
        unmountOnExit
        value={dataPaneTab}
        onValueChange={(e) => setDataPaneTab(e.value)}
        variant="line"
      >
        <Flex
          borderBottomStyle="solid"
          borderBottomColor="gray.300"
          borderBottomWidth={isOpen ? "1px" : "0"}
        >
          <Tabs.List flex="1" borderBottom="0">
            {tabData.map((tab) => {
              return (
                <Tabs.Trigger key={tab.value} value={tab.value}>
                  {tab.title}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>
          <Collapsible.Trigger px="4" cursor="pointer">
            <Icon>
              {isOpen ? <MdExpandMore title="Close" /> : <MdExpandLess title="Open" />}
            </Icon>
          </Collapsible.Trigger>
        </Flex>
        <Collapsible.Content p={0} pb={2}>
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
        </Collapsible.Content>
      </Tabs.Root>
    </Collapsible.Root>
  );
}

TabbedPanel.propTypes = {
  tabData: T.array,
};

export default TabbedPanel;
