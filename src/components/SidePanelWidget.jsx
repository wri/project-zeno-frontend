// Side Panel for Monitoring App
// Renders different Widgets Based on selected insights

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { sidePanelContentAtom, addToReportAtom, deleteFromReportAtom } from "../atoms";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import { useAtom } from "jotai";
import ChartWidget from "./insights/BarChartWidget";
import TimeSeriesWidget from "./insights/TimeSeriesWidget";
import MapWidget from "./insights/MapWidget";
import { CloseButton } from "./ui/close-button";
import { CollecticonClipboardTick } from "@devseed-ui/collecticons-react";

export default function SidePanelWidget() {
  const [sidePanelContent, setSidePanelContent] = useAtom(sidePanelContentAtom);
  const [reportContent, addToReport] = useAtom(addToReportAtom);
  const [, deleteFromReport] = useAtom(deleteFromReportAtom);

  if (sidePanelContent === null) {
    return;
  }

  let WidgetComponent = null;
  switch (sidePanelContent.type) {
    case "text":
      WidgetComponent = TextWidget;
      break;
    case "table":
      WidgetComponent = TableWidget;
      break;
    case "trend":
    case "timeseries":
      WidgetComponent = TimeSeriesWidget;
      break;
    case "chart":
      WidgetComponent = ChartWidget;
      break;
    case "map":
      WidgetComponent = MapWidget;
      break;
    default:
      WidgetComponent = TextWidget;
  }

  const isInReport = reportContent.some((item) => item.title === sidePanelContent.title);

  return (
    <Box position="relative" gridColumn="2" gridRow="2 / -1" my="4" mb="1" borderRadius="lg" border="1px solid" borderColor="border" bg="bg.subtle" justifySelf="stretch" overflowY="scroll">
      <Flex py="2" px="6" gap="2" alignItems="center" bg={isInReport ? "blue.subtle" : "bg.muted"} borderBottomWidth="1px" borderColor="border">
        {isInReport && <CollecticonClipboardTick color="var(--chakra-colors-blue-fg)" />}
        <Heading size="sm" m="0" as="h4">{sidePanelContent.title}</Heading>
        {
          isInReport
            ? <Button size="xs" ml="2" colorPalette="blue" textTransform="uppercase" variant="outline" onClick={() => deleteFromReport(sidePanelContent.title)}>Remove From Report</Button>
            : <Button size="xs" ml="2" colorPalette="blue" textTransform="uppercase" variant="solid" onClick={() => addToReport(sidePanelContent)}>Add To Report</Button>
        }
        <CloseButton size="xs" ml="auto" onClick={() => setSidePanelContent(null)} />
      </Flex>
      <WidgetComponent {...sidePanelContent} />
    </Box>
  );
}
