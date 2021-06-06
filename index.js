const {
  json,
  select,
  scaleTime,
  min,
  max,
  axisBottom,
  axisLeft,
  scaleLinear,
// eslint-disable-next-line no-undef
} = d3;

const height = 500;
const width = 800;
const padding = 50;

const svg = select('svg')
  .attr('height', height)
  .attr('width', width);

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const theYear = (number) => new Date(number, 0);

/* I'm not sure about this one... needs to return date object to map times of riders.
  Format for input is 'mm:ss', from data.Time.  Could also rewrite to pass in data.Seconds,
  which is a number. */
const theTime = (seconds) => new Date(seconds * 1000);

json(url)
  .then((data) => {
    // x-axis (year)
    const xScale = scaleTime()
      .domain(
        [min(data, (d) => theYear(d.Year - 1)),
          max(data, (d) => theYear(d.Year)),
        ],
      )
      .range([padding, width - padding]);

    const xAxis = axisBottom(xScale);

    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height - padding})`)
      .call(xAxis);

    // y-axis (minutes)
    const yScale = scaleLinear()
      .domain(
        [min(data, (d) => theTime(d.Seconds)),
          max(data, (d) => theTime(d.Seconds)),
        ],
      )
      .range([height - padding, padding]);

    const yAxis = axisLeft(yScale)
      .tickFormat((x) => `${Math.floor(x / 60000)}:${((x / 1000) % 60).toString().padEnd(2, '0')}`);

    svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding}, 0)`)
      .call(yAxis);

    // Adding datapoints
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(theYear(d.Year)))
      .attr('cy', (d) => yScale(theTime(d.Seconds)))
      .attr('r', '5px');

    document.getElementById('dummy').innerHTML = JSON.stringify(data);
  });
