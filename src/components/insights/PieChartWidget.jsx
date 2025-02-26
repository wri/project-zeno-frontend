import { useEffect, useRef } from "react";
import * as d3 from "d3";
import T from "prop-types";

export default function PieChartWidget({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data.categories.map((category, index) => ({
      name: category,
      value: data.values[index]
    })));

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll(".arc")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .style("stroke", "#fff")
      .style("stroke-width", "2px");

    svg.selectAll(".label")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text(d => d.data.name);
  }, [data]);

  return <svg ref={chartRef} />;
}

PieChartWidget.propTypes = {
  data: T.shape({
    categories: T.arrayOf(T.string).isRequired,
    values: T.arrayOf(T.number).isRequired,
  }).isRequired,
};
