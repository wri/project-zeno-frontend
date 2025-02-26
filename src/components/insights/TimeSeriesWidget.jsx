import { useEffect, useRef } from "react";
import * as d3 from "d3";
import T from "prop-types";

export default function TimeSeriesWidget({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // get dates from data.data and convert them to Date objects
    const dates = data.map(d => new Date(d.year, 0, 1));
    const x = d3.scaleTime()
      .domain(d3.extent(dates))
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    const line = d3.line()
      .x(d => x(new Date(d.year, 0, 1)))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%Y")));

    svg.append("g")
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={chartRef}></svg>;
}

TimeSeriesWidget.propTypes = {
  data: T.arrayOf(
    T.shape({
      year: T.number.isRequired,
      value: T.number.isRequired,
    })
  ).isRequired,
};
