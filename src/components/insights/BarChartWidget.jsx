import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import T from "prop-types";
import { Box, Heading, Text, IconButton } from "@chakra-ui/react";
import { FaChartBar, FaChartPie } from "react-icons/fa";

export default function ChartWidget({ data, title, description }) {
  const chartRef = useRef();
  const containerRef = useRef();
  const tooltipRef = useRef();
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    const chartDimensions = [500, 500];
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current);

    if (chartType === "bar") {
      const getScaleAndLabel = (maxValue) => {
        if (maxValue >= 1e6) return { scale: 1e6, label: "millions" };
        if (maxValue >= 1e3) return { scale: 1e3, label: "thousands" };
        return { scale: 1, label: "count" };
      };

      const maxValue = d3.max(data.values);
      const { scale } = getScaleAndLabel(maxValue);
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

      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "12px");

      svg.selectAll(".x-axis text")
        .text((d) => (d.length > 10 ? `${d.slice(0, 10)}...` : d));

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px");

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
          tooltip.style("visibility", "visible").text(`${d.category}, ${d.value}`);
        })
        .on("mousemove", event => {
          tooltip.style("top", `${event.clientY + 10}px`).style("left", `${event.clientX + 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    } else {
      const radius = Math.min(500, 500) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const pie = d3.pie().value(d => d.value);
      const data_ready = pie(data.categories.map((category, index) => ({ name: category, value: data.values[index] })));
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const pieGroup = svg.append("g").attr("transform", "translate(250, 250)");

      pieGroup.selectAll("path")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .style("stroke", "#fff")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible").text(`${d.data.name}: ${d.data.value}`);
        })
        .on("mousemove", event => {
          tooltip.style("top", `${event.clientY + 10}px`).style("left", `${event.clientX + 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    }
  }, [data, chartType]);

  return (
    <Box>
      <Heading>{title}</Heading>
      <IconButton
        onClick={() => setChartType(chartType === "bar" ? "pie" : "bar")}
        aria-label="Toggle Chart Type"
        m={2}
        p={2}
      >
        Toggle {chartType === "bar" ? <FaChartPie /> : <FaChartBar />}
      </IconButton>
      <div ref={containerRef}>
        <svg ref={chartRef} width={500} height={500} />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "4px",
            pointerEvents: "none",
            visibility: "hidden",
            zIndex: 1000,
          }}
        />
      </div>
      <Text>{description}</Text>
    </Box>
  );
}

ChartWidget.propTypes = {
  data: T.shape({
    categories: T.arrayOf(T.string).isRequired,
    values: T.arrayOf(T.number).isRequired,
  }).isRequired,
  title: T.string,
  description: T.string,
};
