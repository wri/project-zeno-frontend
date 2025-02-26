// Side Panel for Monitoring App
// Renders different Widgets Based on selected insights

import { Box } from "@chakra-ui/react";
import { sidePanelContentAtom } from "../atoms";
import TextWidget from "./insights/TextWidget";
import TableWidget from "./insights/TableWidget";
import { useAtom } from "jotai";

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
    default:
      WidgetComponent = TextWidget;
  }

  return (
    <Box p="20" h="100%" borderRadius="md" border="1px solid" borderColor="blackAlpha.200">
      <WidgetComponent {...sidePanelContent} />
    </Box>
  );
}
