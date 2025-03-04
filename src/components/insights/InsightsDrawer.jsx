import { Box, Drawer, Button, List, Text, Flex } from "@chakra-ui/react";
import {
  CollecticonClipboardTick,
  CollecticonExpandFromRight,
  CollecticonXmarkSmall,
} from "@devseed-ui/collecticons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { insightsAtom, addToReportAtom } from "../../atoms";
import WidgetButton from "./WidgetButton";
import LclLogo from "../LclLogo";

const InsightsDrawer = () => {
  const [open, setOpen] = useState(false);
  const [insights] = useAtom(insightsAtom);
  const [reportContent] = useAtom(addToReportAtom);
  const isInReport = (title) =>
    reportContent.some((item) => item.title === title);
  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement="start"
      size="md"
    >
      <Drawer.Backdrop />
      <Drawer.Trigger asChild>
        <Button size="xs" variant="ghost" ml="auto">
          <CollecticonExpandFromRight />
          View all Insights
        </Button>
      </Drawer.Trigger>
      <Drawer.Content position="absolute" top="0" bottom="0" left="0">
        <Drawer.Header display="flex" alignItems="center" gap="2">
          <LclLogo avatarOnly />
          <Drawer.Title
            fontSize="xs"
            fontFamily="mono"
            fontWeight="bold"
            m="0"
            letterSpacing="0.5px"
            textTransform="uppercase"
          >
            All Zen0-generated insights
          </Drawer.Title>
          <Drawer.CloseTrigger />
          <Drawer.ActionTrigger asChild ml="auto">
            <Button size="xs" variant="ghost">
              <CollecticonXmarkSmall />
              Close
            </Button>
          </Drawer.ActionTrigger>
        </Drawer.Header>
        <Drawer.Body>
          {insights.length > 0 ? (
            <>
              {reportContent.length > 0 && (
                <Box bg="bg.muted" p="10" pt="8">
                  <Flex gap="2" alignItems="center" mb="4">
                    <CollecticonClipboardTick color="var(--chakra-colors-blue-fg)" />{" "}
                    <Text size="sm">Added to the report</Text>
                  </Flex>
                  <List.Root
                    listStyle="none"
                    pl="0"
                    display="flex"
                    flexDir="column"
                    gap="3"
                    my="1"
                  >
                    {insights
                      .filter((insight) => isInReport(insight.title))
                      .map((insight) => {
                        return (
                          <List.Item key={insight?.title} m="0">
                            <WidgetButton data={insight} />
                          </List.Item>
                        );
                      })}
                  </List.Root>
                </Box>
              )}
              <Box p="10" pt="8">
                <List.Root
                  listStyle="none"
                  pl="0"
                  display="flex"
                  flexDir="column"
                  gap="3"
                  my="1"
                >
                  {insights
                    .filter((insight) => !isInReport(insight.title))
                    .map((insight) => {
                      return (
                        <List.Item key={insight?.title} m="0">
                          <WidgetButton data={insight} />
                        </List.Item>
                      );
                    })}
                </List.Root>
              </Box>
            </>
          ) : (
            <Box>
              Ask Zeno about Key Biodiversity Areas to generate insights
            </Box>
          )}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default InsightsDrawer;
