import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import T from "prop-types";

import { CollecticonDownload2 } from "@devseed-ui/collecticons-react";
import { Button } from "@chakra-ui/react";

const BarChart = ({ data }) => {
  const containerRef = useRef();
  const chartRef = useRef();
  const tooltipRef = useRef();

  const [ chartDimensions, setChartDimentsions ] = useState([0, 0]);

  // Function to convert data to CSV
  const downloadDataAsCSV = () => {
    // Convert the data to CSV
    const csvData = d3.csvFormat(data);

    // Create a Blob object for the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chart-data.csv";

    // Append to the DOM, click, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        const containerRect = containerRef.current.getBoundingClientRect();
        const top = event.clientY - containerRect.top + 10; // Relative to container
        const left = event.clientX - containerRect.left + 10;

        tooltip
          .style("top", `${top}px`)
          .style("left", `${left}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  }, [data, chartDimensions]);

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      <Button
        onClick={downloadDataAsCSV}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "5px 10px",
          background: "white",
          color: "steelblue",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
      <CollecticonDownload2 />
      CSV
      </Button>
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
          pointerEvents: "none", // Ensure it doesn't block mouse events
          visibility: "hidden", // Hidden by default
          zIndex: 1000, // Bring it to the foreground
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
