// Side Panel for Monitoring App
// Renders different Widgets Based on selected insights

import { Box, Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { sidePanelContentAtom, addToReportAtom, deleteFromReportAtom } from "../atoms";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import { useAtom } from "jotai";
import ChartWidget from "./insights/BarChartWidget";
import TimeSeriesWidget from "./insights/TimeSeriesWidget";
import { CgClose } from "react-icons/cg";

export default function SidePanelWidget() {
  const [sidePanelContent, setSidePanelContent] = useAtom(sidePanelContentAtom);
  const [reportContent, addToReport] = useAtom(addToReportAtom);
  const [, deleteFromReport] = useAtom(deleteFromReportAtom);

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
    case "timeseries":
      WidgetComponent = TimeSeriesWidget;
      break;
    case "chart":
      WidgetComponent = ChartWidget;
      break;
    default:
      WidgetComponent = TextWidget;
  }

  const isInReport = reportContent.some((item) => item.title === sidePanelContent.title);

  return (
    <Box position="relative" gridColumn="2" gridRow="2 / -1" my="4" p="12" h="100%" borderRadius="lg" border="1px solid" borderColor="border" bg="bg.subtle" justifySelf="stretch" overflowY="scroll">
      <ButtonGroup
        position="absolute"
        top="10px"
        right="10px"
      >
        {
          isInReport
            ? <Button size="sm" colorScheme="red" onClick={() => deleteFromReport(sidePanelContent.title)}>Remove From Report</Button>
            : <Button size="sm" onClick={() => addToReport(sidePanelContent)}>Add To Report</Button>
        }
        <IconButton
          aria-label="Close panel"
          size="sm"
          onClick={() => setSidePanelContent(null)}
        >
          <CgClose />
        </IconButton>
      </ButtonGroup>
      <WidgetComponent {...sidePanelContent} />
    </Box>
  );
}
