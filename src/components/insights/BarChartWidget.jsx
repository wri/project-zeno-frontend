import { useEffect, useRef } from "react";
import * as d3 from "d3";
import T from "prop-types";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function BarChartWidget({ data, title, description }) {
  const chartRef = useRef();
  const containerRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    // Exit effect if at least one dimension is 0
    const chartDimensions = [500, 500];

    const getScaleAndLabel = (maxValue) => {
      if (maxValue >= 1e6) return { scale: 1e6, label: "millions" };
      if (maxValue >= 1e3) return { scale: 1e3, label: "thousands" };
      return { scale: 1, label: "count" };
    };

    const maxValue = d3.max(data.values);
    const { scale, label } = getScaleAndLabel(maxValue);

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current);

    const margin = { top: 12, right: 1, bottom: 24, left: 60 };
    const width = chartDimensions[0];
    const height = chartDimensions[1];

    const x = d3.scaleBand()
      .domain(data.categories)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, maxValue / scale])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add x-axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px");

    svg.selectAll(".x-axis text")
      .text((d) => (d.length > 10 ? `${d.slice(0, 10)}...` : d));

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px");

    // Add bars
    svg.append("g")
      .selectAll("rect")
      .data(data.values.map((d, i) => ({ value: d, category: data.categories[i] })))
      .enter().append("rect")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value / scale))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(`${d.category}, ${d.value}`);
      })
      .on("mousemove", event => {
        const top = event.clientY + 10; // Relative to container
        const left = event.clientX + 10;

        tooltip
          .style("top", `${top}px`)
          .style("left", `${left}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  }, [data]);

  return (
    <Box>
      <Heading>{title}</Heading>
      <div ref={containerRef}>
        <svg
          ref={chartRef}
          width={500}
          height={500}
        />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "4px",
            pointerEvents: "none", // Ensure it doesn't block mouse events
            visibility: "hidden", // Hidden by default
            zIndex: 1000, // Bring it to the foreground
          }}
        />
      </div>
      <Text>{description}</Text>
    </Box>
  );
}

BarChartWidget.propTypes = {
  data: T.shape({
    categories: T.arrayOf(T.string).isRequired,
    values: T.arrayOf(T.number).isRequired,
  }).isRequired,
  title: T.string,
  description: T.string,
};
