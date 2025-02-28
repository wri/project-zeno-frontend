import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box, Flex, Text } from "@chakra-ui/react";
import T from "prop-types";

export default function TimeSeriesWidget({ data }) {
  const chartRef = useRef();
  const tooltipRef = useRef();
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

    const keys = Object.keys(data.data[0]).filter(key => key !== "year");
    const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

    const x = d3.scaleLinear()
      .domain(d3.extent(data.data, d => d.year))
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data.data.flatMap(d => keys.map(key => d[key])).filter(v => typeof v === "number"))])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    keys.forEach((key) => {
      const lineData = data.data.map(d => ({ year: d.year, value: isNaN(d[key]) ? 0 : d[key] }));

      svg.append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", colorScale(key))
        .attr("stroke-width", 2)
        .attr("d", line);
    });

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")));

    svg.append("g").call(d3.axisLeft(y));

    // Cursor, Tooltip, and Dashed Line
    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "8px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("display", "none");

    const cursorLine = svg.append("line")
      .attr("stroke", "black")
      .attr("stroke-dasharray", "4")
      .attr("y1", 0)
      .attr("y2", height - margin.top - margin.bottom)
      .style("display", "none");

    svg.append("rect")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("fill", "transparent")
      .on("mousemove", function (event) {
        const [mouseX] = d3.pointer(event);
        const year = Math.round(x.invert(mouseX));
        const yearData = data.data.find(d => d.year === year);
        if (yearData) {
          cursorLine.style("display", "block")
            .attr("x1", x(year))
            .attr("x2", x(year));

          tooltip.style("display", "block")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`)
            .html(
              `<strong>Year: ${year}</strong><br>` +
              keys.map(key => `${key}: ${yearData[key] || 0}`).join("<br>")
            );
        }
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
        cursorLine.style("display", "none");
      });
  }, [data, colors]);

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold">{data.title}</Text>
      <svg ref={chartRef} />
      <div ref={tooltipRef} />
      <Flex wrap="wrap" mt={2}>
        {Object.keys(data.data[0]).filter(key => key !== "year").map((key, index) => (
          <Flex key={key} align="center" mr={4}>
            <Box w={4} h={4} bg={colors[index % colors.length]} mr={2} />
            <Text fontSize="xs">{key}</Text>
          </Flex>
        ))}
      </Flex>
      <Text mt={4}>{data.description}</Text>
    </Box>
  );
}

TimeSeriesWidget.propTypes = {
  data: T.shape({
    data: T.arrayOf(T.object).isRequired,
    xlabel: T.string,
    ylabel: T.string,
    title: T.string,
    description: T.string,
    analysis: T.string,
  }).isRequired,
};
