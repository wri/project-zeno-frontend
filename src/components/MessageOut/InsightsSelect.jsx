import T from "prop-types";
import WidgetButton from "../insights/WidgetButton";
import { List } from "@chakra-ui/react";

function InsightsSelect({ data }) {
  try {
    let { insights } = JSON.parse(data.replace(/\bNaN\b/g, "null")); // replace NaN with null
    if (!insights) {
      return <div />;
    }
    return (
      <div>
        <h1>Generated Insights</h1>
        <List.Root listStyle="none" pl="0" display="flex" flexDir="row" flexWrap="wrap" gap="2">
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
      </div>
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
