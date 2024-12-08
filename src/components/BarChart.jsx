import { useEffect, useRef } from "react";
import * as d3 from "d3";
import T from "prop-types";

const BarChart = ({ data }) => {
  const chartRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current);

    const width = 250;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 20, left: 50 };

    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)")
      .style("font-size", "12px");

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add bars
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(`Category: ${d.category}, Value: ${d.value}`);
      })
      .on("mousemove", event => {
        tooltip
          .style("top", `${event.pageY-100}px`)
          .style("left", `${event.pageX-20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={chartRef}
        width={400}
        height={400}
      />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "5px",
          borderRadius: "4px",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
  data: T.arrayOf(T.shape({
    category: T.string,
    value: T.number
  })).isRequired
};
export default BarChart;
