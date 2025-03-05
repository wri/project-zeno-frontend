import T from "prop-types";
import WidgetButton from "../insights/WidgetButton";
import { Box, List, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import JSON5 from "json5";
import { useAtom } from "jotai";
import { useState } from "react";
import { addInsightsAtom } from "../../atoms";

function InsightsSelect({ data }) {
  const [, setInsightsDrawerContent] = useAtom(addInsightsAtom);
  const [insights, setCurrentInsights] = useState([]);

  useEffect(() => {
    try {
      let { insights: newInsights } = JSON5.parse(data);
      setInsightsDrawerContent(newInsights);
      setCurrentInsights(newInsights);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Error parsing insights data", e);
    }
  }, [data, setInsightsDrawerContent]);

  if (!insights) {
    return null;
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
}

InsightsSelect.propTypes = {
  data: T.object.isRequired,
};

export default InsightsSelect;
