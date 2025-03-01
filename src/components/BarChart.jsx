import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { chartDataAtom, dataPaneTabAtom, mapLayersAtom } from "../atoms";
import { useAtomValue } from "jotai";

const BarChart = () => {
  const containerRef = useRef();
  const chartRef = useRef();
  const tooltipRef = useRef();

  const [ chartDimensions, setChartDimensions ] = useState([0, 0]);
  const [ colorMapping, setColorMapping ] = useState({});
  // const dataPaneOpen = useAtomValue(dataPaneOpenAtom);
  const dataPaneTab = useAtomValue(dataPaneTabAtom);
  const data = useAtomValue(chartDataAtom);
  const mapLayers = useAtomValue(mapLayersAtom);

  useEffect(() => {
    try {
      let colors = {};
      const contextLayer = mapLayers.find((l) => l.id === "context-layer");
      const contextLayerMetadata = contextLayer?.metadata;
      const metadata = JSON.parse(contextLayerMetadata);
      metadata.value_mappings.forEach(({ description, color_hexcode }) => {
        colors[description] = color_hexcode;
      });
      setColorMapping(colors);
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      // do nothing
    }
  }, [mapLayers]);

  useEffect(() => {
    if (dataPaneTab && containerRef.current) {
      const observer = new ResizeObserver(entries => {
        const e = entries[0];
        const parentElement = e.target.parentElement;
        const newDimensions = [parentElement.clientWidth - 32, parentElement.clientHeight];
        if (parentElement.clientHeight <= 300) {
          setChartDimensions(newDimensions);
        }
      });
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [dataPaneTab]);

  useEffect(() => {
    // Exit effect if at least one dimension is 0
    if (!chartDimensions.every((x) => !!x) || !data) return;

    const getScaleAndLabel = (maxValue) => {
      if (maxValue >= 1e6) return { scale: 1e6, label: "millions" };
      if (maxValue >= 1e3) return { scale: 1e3, label: "thousands" };
      return { scale: 1, label: "count" };
    };

    const maxValue = d3.max(data, d => d.value);
    const { scale, label } = getScaleAndLabel(maxValue);

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current);

    const margin = { top: 12, right: 1, bottom: 24, left: 60 };
    const width = chartDimensions[0];
    const height = chartDimensions[1];

    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
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
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text(`alerts (${label})`);

    // Add bars
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.value / scale))
      .attr("height", d => y(0) - y(d.value / scale))
      .attr("width", x.bandwidth())
      .attr("fill", d => colorMapping[d.category] || "steelblue")
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
      <svg
        ref={chartRef}
        width={chartDimensions[0]}
        height={chartDimensions[1]}
      />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          background: "var(--chakra-colors-bg)",
          color: "var(--chakra-colors-fg)",
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

export default BarChart;
