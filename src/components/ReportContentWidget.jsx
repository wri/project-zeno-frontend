// Report Widget for Monitoring App
// Renders different Widgets Based on selected insights

import { Box, Button } from "@chakra-ui/react";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import ChartWidget from "./insights/BarChartWidget";
import MapWidget from "./insights/MapWidget";
import TimeSeriesWidget from "./insights/TimeSeriesWidget";
import { deleteFromReportAtom } from "../atoms";
import { useAtom } from "jotai";
import { CollecticonTrashBin } from "@devseed-ui/collecticons-react";

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
    case "map":
      WidgetComponent = MapWidget;
      break;
    case "chart":
      WidgetComponent = ChartWidget;
      break;
    default:
      WidgetComponent = TextWidget;
  }

  return (
    <Box
      position="relative"
      gridColumn="2"
      gridRow="2 / -1"
      mb="4"
      p="12"
      h="100%"
      borderRadius="lg"
      bg="bg"
      border="1px solid"
      borderColor="border"
      justifySelf="stretch"
      overflowY="scroll"
    >
      <Button
        position="absolute"
        top="10px"
        right="10px"
        aria-label="Remove from report"
        size="xs"
        variant="ghost"
        onClick={() => deleteFromReport(data.title)}
      >
        <CollecticonTrashBin />
        Remove from report
      </Button>
      <WidgetComponent {...data} />
    </Box>
  );
}
