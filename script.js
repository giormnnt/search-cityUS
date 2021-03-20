const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const getJSON = async () => {
  const res = await fetch(endpoint);
  const data = await res.json();
  cities.push(...data);
};

getJSON();

const findMatches = function (wordToMatch, cities) {
  return cities.filter(place => {
    // if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
};

const displayMatches = function () {
  const matchArray = findMatches(this.value, cities);
  console.log(matchArray);
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
