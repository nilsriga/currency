// Import necessary modules from React and D3.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Define the structure of the rates data using TypeScript interface
interface CurrencyLineChartProps {
  rates: { id: number; date: string; rate: string }[];
}

// Define the CurrencyLineChart functional component
const CurrencyLineChart: React.FC<CurrencyLineChartProps> = ({ rates }) => {
  // Create a reference to the SVG element using useRef hook
  const svgRef = useRef<SVGSVGElement | null>(null);

  // useEffect hook to create the chart whenever the rates data changes
  useEffect(() => {
    // If there are no rates, do nothing
    if (rates.length === 0) return;

    // Select the SVG element using D3.js
    const svg = d3.select(svgRef.current);
    // Clear any previous chart content
    svg.selectAll("*").remove();

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Append a group element to the SVG and apply a transformation to account for margins
    const g = svg
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define a time parser to convert date strings to Date objects
    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

    // Map the rates data to a new format and filter out entries with null dates
    const data = rates
      .map(rate => ({
        date: parseTime(rate.date), // Parse the date string to a Date object
        rate: +rate.rate, // Convert the rate string to a number
      }))
      .filter(d => d.date !== null) as { date: Date; rate: number }[]; // Filter out entries with null dates

    // Define the x-axis scale as a time scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date]) // Set the domain to the extent of the dates
      .range([0, width]); // Set the range to the width of the chart

    // Define the y-axis scale as a linear scale
    const y = d3
      .scaleLinear()
      .domain([d3.min(data, d => d.rate) || 0, d3.max(data, d => d.rate) || 0]) // Set the domain to the min and max of the rates
      .nice() // Make the domain end on nice round values
      .range([height, 0]); // Set the range to the height of the chart

    // Define a custom date format for the x-axis
    const dateFormat = d3.timeFormat('%d.%m'); // Format dates as "DD.MM"

    // Define the x-axis using the x scale
    const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g
        .attr('transform', `translate(0,${height})`) // Position the x-axis at the bottom of the chart
        .call(
          d3.axisBottom(x).tickFormat((domainValue) => {
            // Format the tick values
            if (domainValue instanceof Date) {
              return dateFormat(domainValue); // Format as "DD.MM"
            }
            return ''; // Handle cases where domainValue is not a Date
          })
        );

    // Define the y-axis using the y scale
    const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g.call(d3.axisLeft(y)); // Position the y-axis on the left of the chart

    // Append the x-axis to the group element
    g.append('g').call(xAxis);
    // Append the y-axis to the group element
    g.append('g').call(yAxis);

    // Define the line generator function
    const line = d3
      .line<{ date: Date; rate: number }>()
      .x(d => x(d.date)) // Set the x value to the date
      .y(d => y(d.rate)); // Set the y value to the rate

    // Append the line path to the group element
    g
      .append('path')
      .datum(data) // Bind the data to the path
      .attr('fill', 'none') // Remove any fill color
      .attr('stroke', 'steelblue') // Set the stroke color to steelblue
      .attr('stroke-width', 1.5) // Set the stroke width
      .attr('d', line); // Use the line generator function to create the path
  }, [rates]); // Re-run the effect whenever the rates data changes

  // Return the SVG element wrapped in a div for responsive design
  return (
    <div style={{ width: '80%', padding: '5%' }}>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
};

// Export the CurrencyLineChart component as the default export
export default CurrencyLineChart;
