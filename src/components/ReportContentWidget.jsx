// Report Widget for Monitoring App
// Renders different Widgets Based on selected insights

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import ChartWidget from "./insights/BarChartWidget";
import MapWidget from "./insights/MapWidget";
import TimeSeriesWidget from "./insights/TimeSeriesWidget";
import { deleteFromReportAtom } from "../atoms";
import { useAtom } from "jotai";
import { CollecticonTrashBin, CollecticonArrowMove } from "@devseed-ui/collecticons-react";

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
      h="100%"
      display="flex"
      flexDirection="column"
      borderRadius="lg"
      bg="bg"
      border="1px solid"
      borderColor="border"
      justifySelf="stretch"
    >
      <Flex p="4" pb="2" gap="4" alignItems="center" justifyContent="space-between" borderBottomWidth="1px" borderColor="border.emphasized">
        <Flex gap="2" alignItems="center" flex="1">
          <CollecticonArrowMove size="24" className="drag-handle" cursor="grab" />
          <Heading size="sm" m="0" as="h4">{data.title}</Heading>
        </Flex>
        <Button
          aria-label="Remove from report"
          size="xs"
          variant="ghost"
          onClick={() => deleteFromReport(data.title)}
        >
          <CollecticonTrashBin />
          Remove from report
        </Button>
      </Flex>
      <Box p="4" pt="2" flex="1" overflowY="auto">
        <WidgetComponent {...data} />
      </Box>
    </Box>
  );
}
