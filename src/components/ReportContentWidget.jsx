// Report Widget for Monitoring App
// Renders different Widgets Based on selected insights

import { Box, IconButton } from "@chakra-ui/react";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import ChartWidget from "./insights/BarChartWidget";
import TimeSeriesWidget from "./insights/TimeSeriesWidget";
import { deleteFromReportAtom } from "../atoms";
import { useAtom } from "jotai";
import { TiDelete } from "react-icons/ti";

export default function ReportContentWidget(data) {
  const [, deleteFromReport] = useAtom(deleteFromReportAtom);

  if (data === null) {
    return <Box />;
  }

  let WidgetComponent = null;
  switch (data.type) {
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
    default:
      WidgetComponent = TextWidget;
  }

  return (
    <Box position="relative" gridColumn="2" gridRow="2 / -1" my="4" p="12" h="100%" borderRadius="lg" border="1px solid" borderColor="border" bg="bg.subtle" justifySelf="stretch" overflowY="scroll">
      <IconButton
        position="absolute"
        top="10px"
        right="10px"
        aria-label="Remove from report"
        size="sm"
        onClick={() => deleteFromReport(data.title)}
      >
        <TiDelete />
      </IconButton>
      <WidgetComponent {...data} />
    </Box>
  );
}
