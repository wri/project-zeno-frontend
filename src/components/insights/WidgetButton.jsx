import { Button, HStack, Text, Box } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { FaChartPie, FaChartLine, FaFont, FaTable, FaChartBar } from "react-icons/fa";
import { sidePanelContentAtom } from "../../atoms";
import { useAtom } from "jotai";
import T from "prop-types";

const iconMap = {
  text: FaFont,
  chart: {
    pie: FaChartPie,
    bar: FaChartBar,
    line: FaChartLine,
  },
  trend: FaChartLine,
  time_series: FaChartLine,
  table: FaTable,
};

export default function WidgetButton({ data }) {
  const { title, type, chart_type } = data;
  const [, setSidePanelContent] = useAtom(sidePanelContentAtom);

  let IconComponent = FaFont;

  if (type === "chart" && chart_type && iconMap.chart[chart_type]) {
    IconComponent = iconMap.chart[chart_type];
  } else if (iconMap[type]) {
    IconComponent = iconMap[type];
  }

  return (
    <Tooltip content={title} showArrow>
      <Button
        w="full"
        h="50px"
        variant="outline"
        justifyContent="start"
        onClick={() => {
          setSidePanelContent(null);
          setSidePanelContent(data);
        }}
      >
        <HStack spacing={3} w="full" align="center">
          <Box display="flex" alignItems="center" justifyContent="center" minW={5}>
            <IconComponent size={20} />
          </Box>
          <Text
            maxW="200px"
            isTruncated
            noOfLines={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            textAlign="left"
          >
            {title}
          </Text>
        </HStack>
      </Button>
    </Tooltip>
  );
}

WidgetButton.propTypes = {
  data: T.object.isRequired
};
