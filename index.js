const {
  json,
  select,
  scaleTime,
  timeFormat,
  min,
  max,
  axisBottom,
  axisLeft,
  scaleOrdinal,
  event,
// eslint-disable-next-line no-undef
} = d3;

const height = 500;
const width = 800;
const padding = 50;

const svg = select('svg')
  .attr('height', height)
  .attr('width', width);

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const color = scaleOrdinal(['red', 'green']);

const tooltip = select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('display', 'none');

const theYear = (number) => new Date(number, 0);

const theTime = (seconds) => new Date(seconds * 1000);

json(url)
  .then((data) => {
    // x-axis (year)
    const xScale = scaleTime()
      .domain(
        [min(data, (d) => theYear(d.Year - 1)),
          max(data, (d) => theYear(d.Year + 1)),
        ],
      )
      .range([padding, width - padding]);

    const xAxis = axisBottom(xScale);

    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height - padding})`)
      .call(xAxis);

    // y-axis (minutes)
    const yScale = scaleTime()
      .domain(
        [min(data, (d) => theTime(d.Seconds)),
          max(data, (d) => theTime(d.Seconds)),
        ],
      )
      .range([padding, height - padding]);

    const yAxis = axisLeft(yScale)
      .tickFormat((d) => timeFormat('%M:%S')(d));

    svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding}, 0)`)
      .call(yAxis);

    // legend
    const legend = svg.append('g')
      .attr('id', 'legend');

    legend.selectAll('rect')
      .data([false, true])
      .enter()
      .append('rect')
      .attr('x', width - (padding * 4) - 12)
      .attr('y', (_d, i) => (padding * 2) + (12 * i))
      .attr('height', 10)
      .attr('width', 10)
      .attr('fill', (d) => (color(d)));

    legend.selectAll('text')
      .data([false, true])
      .enter()
      .append('text')
      .text((d) => (!d ? 'Riders with doping allegations' : 'Riders with no doping allegations'))
      .attr('x', width - (padding * 4))
      .attr('y', (_d, i) => (padding * 2) + (12 * (i + 1) - 2))
      .attr('height', 10)
      .attr('width', padding)
      .attr('class', 'legend-text');

    // Adding datapoints
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('data-xvalue', (d) => theYear(d.Year))
      .attr('data-yvalue', (d) => theTime(d.Seconds))
      .attr('cx', (d) => xScale(theYear(d.Year)))
      .attr('cy', (d) => yScale(theTime(d.Seconds)))
      .attr('r', '5px')
      .attr('fill', (d) => color(!d.Doping))
      .on('mouseover', (d) => {
        tooltip.style('display', 'block')
          .attr('data-year', () => theYear(d.Year))
          .style('left', () => `${d3.event.pageX + 10}px`)
          .style('top', () => `${d3.event.pageY - 50}px`)
          .html(`<p>${d.Name} (${d.Nationality})</p>  
            <p>Place: ${d.Place} Time: ${d.Time}</p>
            <p>${d.Doping}</p>`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
  });
