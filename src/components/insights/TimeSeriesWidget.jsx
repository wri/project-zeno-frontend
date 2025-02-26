import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box, Flex, Text } from "@chakra-ui/react";
import T from "prop-types";

export default function TimeSeriesWidget({ data }) {
  const chartRef = useRef();
  const colors = d3.schemeCategory10; // Use D3's color scheme

  useEffect(() => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 100, bottom: 40, left: 60 };

    d3.select(chartRef.current).selectAll("*").remove();
    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const keys = Object.keys(data[0]);
    const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data.flatMap(d => Object.values(d)).filter(v => !isNaN(v)))])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    const line = d3.line()
      .x((_, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    keys.forEach((key) => {
      const lineData = data.map(d => (isNaN(d[key]) ? 0 : d[key]));

      svg.append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", colorScale(key))
        .attr("stroke-width", 2)
        .attr("d", line);
    });

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5));

    svg.append("g").call(d3.axisLeft(y));
  }, [data, colors]);

  return (
    <Box>
      <svg ref={chartRef} />
      <Flex wrap="wrap" mt={2}>
        {Object.keys(data[0]).map((key, index) => (
          <Flex key={key} align="center" mr={4}>
            <Box w={4} h={4} bg={colors[index % colors.length]} mr={2} />
            <Text fontSize="sm">{key}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

TimeSeriesWidget.propTypes = {
  data: T.arrayOf(T.object).isRequired,
};
