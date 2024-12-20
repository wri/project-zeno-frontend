import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import T from "prop-types";

const BarChart = ({ data }) => {
  const containerRef = useRef();
  const chartRef = useRef();
  const tooltipRef = useRef();

  const [ chartDimensions, setChartDimentsions ] = useState([0, 0]);

  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        const e = entries[0];
        const parentElement = e.target.parentElement;
        setChartDimentsions([parentElement.clientWidth, parentElement.clientHeight]);
      });
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    // Exit effect if at least one dimesion is 0
    if (!chartDimensions.every(x => !!x)) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current);

    const margin = { top: 24, right: 12, bottom: 36, left: 60 };
    const width = chartDimensions[0];
    const height = chartDimensions[1];

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
      .style("font-size", "12px");

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

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
  }, [data, chartDimensions]);

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      <svg
        ref={chartRef}
        width={chartDimensions[0]}
        height={chartDimensions[1]}
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
