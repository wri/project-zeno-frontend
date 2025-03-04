import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import T from "prop-types";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { FaChartBar, FaChartPie } from "react-icons/fa";

export default function ChartWidget({ data, description }) {
  const chartRef = useRef();
  const containerRef = useRef();
  const tooltipRef = useRef();
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    const [width, height] = [500, 500];
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("background", "var(--chakra-colors-bg)")
      .style("padding", "8px")
      .style("border", "1px solid var(--chakra-colors-border)")
      .style("border-radius", "4px")
      .style("display", "none");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    if (chartType === "bar") {
      const maxValue = d3.max(data.values);
      const margin = { top: 12, right: 1, bottom: 24, left: 60 };

      const x = d3.scaleBand()
        .domain(data.categories)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, maxValue])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // X-axis
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "12px")
        .text(d => (d.length > 10 ? `${d.slice(0, 10)}...` : d));

      // Y-axis with custom tick format
      const customTickFormat = d => (Math.abs(d) < 1000 ? d3.format("~f")(d) : d3.format(".2s")(d));
      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(customTickFormat))
        .selectAll("text")
        .style("font-size", "0.8em");

      // Render y-axis unit label if available
      if (data.unit) {
        svg.append("text")
          .attr("transform", `translate(${margin.left / 2 - 15},${(height - margin.top - margin.bottom) / 2}) rotate(-90)`)
          .style("text-anchor", "middle")
          .text(data.unit);
      }

      // Render bars
      svg.append("g")
        .selectAll("rect")
        .data(data.values.map((value, i) => ({ value, category: data.categories[i] })))
        .enter()
        .append("rect")
        .attr("x", d => x(d.category))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth())
        .attr("fill", (d, i) => color(i))
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible").text(`${d.category}, ${d.value}`);
        })
        .on("mousemove", event => {
          const containerBounds = containerRef.current.getBoundingClientRect();
          tooltip.style("display", "block")
            .style("left", `${event.clientX - containerBounds.left + 10}px`)
            .style("top", `${event.clientY - containerBounds.top + 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    } else {
      // Pie chart rendering
      const radius = Math.min(width, height) / 2;
      const pie = d3.pie().value(d => d.value);
      const pieData = pie(data.categories.map((category, index) => ({ name: category, value: data.values[index] })));
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const pieGroup = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      pieGroup.selectAll("path")
        .data(pieData)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .style("stroke", "var(--chakra-colors-border-emphasized)")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible")
            .style("display", "block")
            .text(`${d.data.name}: ${d.data.value}`);
        })
        .on("mousemove", event => {
          const containerBounds = containerRef.current.getBoundingClientRect();
          tooltip.style("left", `${event.clientX - containerBounds.left + 10}px`)
            .style("top", `${event.clientY - containerBounds.top + 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    }
  }, [data, chartType]);

  return (
    <Box ref={containerRef} style={{ position: "relative" }} p="6">
      <IconButton
        onClick={() => setChartType(chartType === "bar" ? "pie" : "bar")}
        aria-label="Toggle Chart Type"
        mt={2}
        px={2}
        variant="surface"
        size="xs"
      >
        Toggle Chart Type {chartType === "bar" ? <FaChartPie /> : <FaChartBar />}
      </IconButton>
      <svg ref={chartRef} width={500} height={500} />
      <div ref={tooltipRef} />
      <Text>{description}</Text>
    </Box>
  );
}

ChartWidget.propTypes = {
  data: T.shape({
    categories: T.arrayOf(T.string).isRequired,
    values: T.arrayOf(T.number).isRequired,
    unit: T.string, // Optional unit property for y-axis label
  }).isRequired,
  description: T.string,
};
