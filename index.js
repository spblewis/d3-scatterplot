const {
  json,
  select,
  scaleTime,
  min,
  max,
  axisBottom,
  axisLeft,
// eslint-disable-next-line no-undef
} = d3;

const height = 500;
const width = 800;
const padding = 50;

const svg = select('svg')
  .attr('height', height)
  .attr('width', width);

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const getYear = (number) => new Date(number, 0);

/* I'm not sure about this one... needs to return date object to map times of riders.
  Format for input is 'mm:ss', from data.Time.  Could also rewrite to pass in data.Seconds,
  which is a number. */
const getMinutes = (seconds) => new Date(seconds * 1000);

json(url)
  .then((data) => {
    // x-axis (year)
    const xScale = scaleTime()
      .domain(
        [min(data, (d) => getYear(d.Year)),
          max(data, (d) => getYear(d.Year)),
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
        [min(data, (d) => getMinutes(d.Seconds).getTime()),
          max(data, (d) => getMinutes(d.Seconds).getTime()),
        ],
      )
      .range([height - padding, padding]);

    const yAxis = axisLeft(yScale);

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
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', '5px');

    document.getElementById('dummy').innerHTML = JSON.stringify(data);
  });
