import { ButtonGroup, Button, IconButton, Text } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { sidePanelContentAtom, addToReportAtom } from "../../atoms";
import { useAtom } from "jotai";
import T from "prop-types";
import { CollecticonChartBars, CollecticonChartLine, CollecticonMap, CollecticonTable, CollecticonTextBlock } from "@devseed-ui/collecticons-react";

const iconMap = {
  text: CollecticonTextBlock,
  chart: CollecticonChartBars,
  trend: CollecticonChartLine,
  timeseries: CollecticonChartLine,
  table: CollecticonTable,
  map: CollecticonMap,
};

export default function WidgetButton({ data }) {
  const { title, type, chart_type } = data;
  const [, setSidePanelContent] = useAtom(sidePanelContentAtom);
  const [reportContent] = useAtom(addToReportAtom);

  let IconComponent = CollecticonTextBlock;

  if (type === "chart" && chart_type && iconMap.chart[chart_type]) {
    IconComponent = iconMap.chart[chart_type];
  } else if (iconMap[type]) {
    IconComponent = iconMap[type];
  }
  const isInReport = reportContent.some((item) => item.title === title);
  return (
    <Tooltip content={title} showArrow>
      <ButtonGroup
        w="full"
        attached
        _groupHover={{ colorPalette: "blue" }}
        size="xl"
        onClick={() => {
          setSidePanelContent(data);
        }}
      >
        <IconButton color="white" bg={isInReport ? "blue.900" : "gray.500"}>
          <IconComponent />
        </IconButton>
        <Button variant="outline" flex="1" justifyContent="start" borderColor={isInReport && "blue.900"}>
          <Text
            isTruncated
            fontWeight="bold"
            fontSize="sm"
            noOfLines={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {title}
          </Text>
        </Button>
      </ButtonGroup>
    </Tooltip>
  );
}

WidgetButton.propTypes = {
  data: T.object.isRequired,
};
