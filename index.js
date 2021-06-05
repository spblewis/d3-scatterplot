const {
  json,
// eslint-disable-next-line no-undef
} = d3;

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

json(url)
  .then((data) => { document.getElementById('dummy').innerHTML = JSON.stringify(data); });
