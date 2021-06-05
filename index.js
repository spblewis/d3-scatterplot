const {
  json,
// eslint-disable-next-line no-undef
} = d3;

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const getYear = (number) => new Date(number, 0);

/* I'm not sure about this one... needs to return date object to map times of riders.
  Format for input is 'dd:dd', from data.Time.  Could also rewrite to pass in data.Seconds,
  which is a number. */
const getminutes = (string) => new Date(string);

json(url)
  .then((data) => { document.getElementById('dummy').innerHTML = JSON.stringify(data); });
