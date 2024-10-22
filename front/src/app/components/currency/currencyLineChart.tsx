import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CurrencyLineChartProps {
  rates: { id: number; date: string; rate: string }[]; // Define the structure of your rates data
}

const CurrencyLineChart: React.FC<CurrencyLineChartProps> = ({ rates }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (rates.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

    // Map and filter out null dates
    const data = rates
      .map(rate => ({
        date: parseTime(rate.date), // May return null
        rate: +rate.rate, // Convert rate to number
      }))
      .filter(d => d.date !== null) as { date: Date; rate: number }[]; // Filter out entries with null dates

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date]) // d3.extent can return [undefined, undefined], but this is safe since we filtered the data
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, d => d.rate) || 0, d3.max(data, d => d.rate) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Custom "DD.MM" date format for the x-axis
    const dateFormat = d3.timeFormat('%d.%m'); // Format as "DD.MM"

    // Define the correct type for 'g' as SVGGElement
    const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(
          d3.axisBottom(x).tickFormat((domainValue) => {
            // Check if the domainValue is a Date, then format it
            if (domainValue instanceof Date) {
              return dateFormat(domainValue); // Format as "DD.MM"
            }
            return ''; // Handle cases where domainValue is not a Date (though it should be a Date)
          })
        );

    const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    const line = d3
      .line<{ date: Date; rate: number }>()
      .x(d => x(d.date))
      .y(d => y(d.rate));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [rates]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default CurrencyLineChart;
