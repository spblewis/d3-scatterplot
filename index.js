const {
  json,
  select,
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
const getminutes = (string) => new Date(string);

json(url)
  .then((data) => {
    // x-axis
    svg.append('g')
      .attr('id', 'x-axis');
    // y-axis
    svg.append('g')
      .attr('id', 'y-axis');
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
