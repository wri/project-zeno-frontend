import { ButtonGroup, Button, IconButton, Text } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { FaChartLine, FaFont, FaTable, FaChartBar } from "react-icons/fa";
import { sidePanelContentAtom } from "../../atoms";
import { useAtom } from "jotai";
import T from "prop-types";

const iconMap = {
  text: FaFont,
  chart: FaChartBar,
  trend: FaChartLine,
  timeseries: FaChartLine,
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
      <ButtonGroup
        w="full"
        size="sm"
        attached
        _groupHover={{ colorPalette: "blue" }}
        onClick={() => {
          setSidePanelContent(data);
        }}
      >
        <IconButton variant="solid" size="xl" bg="gray.500">
          <IconComponent />
        </IconButton>
        <Button variant="outline" py="6" flex="1" justifyContent="start">
          <Text
            isTruncated
            fontWeight="bold"
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
