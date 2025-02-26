// Side Panel for Monitoring App
// Renders different Widgets Based on selected insights

import { Box } from "@chakra-ui/react";
import { sidePanelContentAtom } from "../atoms";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import { useAtom } from "jotai";
import PieChartWidget from "./insights/PieChartWidget";
import BarChartWidget from "./insights/BarChartWidget";
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
      switch (sidePanelContent.chart_type) {
        case "pie":
          WidgetComponent = PieChartWidget;
          break;
        case "bar":
          WidgetComponent = BarChartWidget;
          break;
        default:
          WidgetComponent = BarChartWidget;
      }
      break;
    default:
      WidgetComponent = TextWidget;
  }

  return (
    <Box p="20" h="100%" borderRadius="md" border="1px solid" borderColor="blackAlpha.200">
      <WidgetComponent {...sidePanelContent} />
    </Box>
  );
}
