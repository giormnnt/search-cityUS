const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction(...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const getJSON = async () => {
  const res = await fetch(endpoint);
  const data = await res.json();
  cities.push(...data);
};

getJSON();

const numberWithCommas = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const findMatches = function (wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
};

const displayMatches = function () {
  let html;
  const matchArray = findMatches(this.value, cities);
  if (Array.isArray(matchArray) && !matchArray.length) {
    html = `
      <li>
        <span class="name">No Results Found</span>
      </li>
    `;
  } else {
    html = matchArray
      .map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(
          regex,
          `<span class="hl">${this.value}</span>`
        );
        const stateName = place.state.replace(
          regex,
          `<span class="hl">${this.value}</span>`
        );
        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
      })
      .join('');
  }
  suggestions.innerHTML = html;
};

searchInput.addEventListener('input', debounce(displayMatches, 300));
