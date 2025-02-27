// Side Panel for Monitoring App
// Renders different Widgets Based on selected insights

import { Box } from "@chakra-ui/react";
import { sidePanelContentAtom } from "../atoms";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import { useAtom } from "jotai";
import ChartWidget from "./insights/BarChartWidget";
import TimeSeriesWidget from "./insights/TimeSeriesWidget";

export default function SidePanelWidget() {
  const [sidePanelContent] = useAtom(sidePanelContentAtom);

  if (sidePanelContent === null) {
    return <Box />;
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
    case "time_series":
      WidgetComponent = TimeSeriesWidget;
      break;
    case "chart":
      WidgetComponent = ChartWidget;
      break;
    default:
      WidgetComponent = TextWidget;
  }

  return (
    <Box gridColumn="2" gridRow="2 / -1" my="4" p="12" h="100%" borderRadius="lg" border="1px solid" borderColor="border" bg="bg.subtle" justifySelf="stretch" overflowY="scroll">
      <WidgetComponent {...sidePanelContent} />
    </Box>
  );
}
