import T from "prop-types";
import WidgetButton from "../insights/WidgetButton";
import { Box, List, Text } from "@chakra-ui/react";
import JSON5 from "json5";
import { useSetAtom } from "jotai";
import { setInsightsContentAtom } from "../../atoms";

function InsightsSelect({ data }) {
  const setInsightsContent = useSetAtom(setInsightsContentAtom);
  try {
    let { insights } = JSON5.parse(data);
    setInsightsContent(insights);
    if (!insights) {
      return <div />;
    }
    return (
      <Box>
        <Text fontSize="xs" fontFamily="mono" mb="2" letterSpacing="0.5px" textTransform="uppercase">
          Zeno Generated Insights
        </Text>
        <List.Root listStyle="none" pl="0" display="flex" flexDir="column" gap="3" my="1">
          {
            insights && insights.map((insight) => {
              return (
                <List.Item key={insight?.title} m="0">
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
