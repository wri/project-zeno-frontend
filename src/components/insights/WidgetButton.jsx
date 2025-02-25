import { Button, HStack, Text, Box } from "@chakra-ui/react";
import { FaChartPie, FaChartLine, FaFont, FaTable } from "react-icons/fa";
import T from "prop-types";

const iconMap = {
  text: FaFont,
  chart: {
    pie: FaChartPie,
    bar: FaChartLine,
    line: FaChartLine,
  },
  table: FaTable,
};

export default function WidgetButton({ data, onClick }) {
  const { title, type, chart_type } = data;
  let IconComponent = FaFont;

  if (type === "chart" && chart_type && iconMap.chart[chart_type]) {
    IconComponent = iconMap.chart[chart_type];
  } else if (iconMap[type]) {
    IconComponent = iconMap[type];
  }

  return (
    <Button w="full" variant="outline" justifyContent="start" onClick={onClick}>
      <HStack spacing={3} w="full" align="center">
        <Box display="flex" alignItems="center" justifyContent="center" minW={5}>
          <IconComponent size={20} />
        </Box>
        <Text maxW="200px" whiteSpace="normal" wordBreak="break-word" textAlign="left">
          {title}
        </Text>
      </HStack>
    </Button>
  );
}

WidgetButton.propTypes = {
  data: T.object.isRequired,
  onClick: T.func,
};
