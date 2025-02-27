import T from "prop-types";
import WidgetButton from "../insights/WidgetButton";
import { Box, List, Text } from "@chakra-ui/react";

function InsightsSelect({ data }) {
  try {
    let { insights } = JSON.parse(data.replace(/\bNaN\b/g, "null")); // replace NaN with null
    if (!insights) {
      return <div />;
    }
    return (
      <Box>
        <Text fontSize="xs" fontFamily="mono" mb="2" letterSpacing="0.5px" textTransform="uppercase">
          Zeno Generated Insights
        </Text>
        <List.Root listStyle="none" pl="0" display="flex" flexDir="row" flexWrap="wrap" gap="2">
          {
            insights && insights.map((insight) => {
              return (
                <List.Item key={insight?.title} m="0" w="100%">
                  <WidgetButton data={insight} />
                </List.Item>
              );
            })
          }
        </List.Root>
      </Box>
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error parsing insights data", e);
    return <div />;
  }
}

InsightsSelect.propTypes = {
  data: T.object.isRequired,
};

export default InsightsSelect;
