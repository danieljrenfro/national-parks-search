const apiKey = 'LFQb4kIy1vvEWcEd7ITarxQecmyon4wWTmA6MSkY';
const searchUrl = 'https://developer.nps.gov/api/v1/parks'




function displayResults(response) {
  // $('.results-list').empty();
  console.log(response.data);
  let html = '';
  for (let i = 0; i < response.data.length; i++) {
    html += `<li>
    <h2>${response.data[i].fullName}</h2>
    <p><a href="${response.data[i].url}" target="_blank">${response.data[i].fullName}'s Website</a></p>
    <p>${response.data[i].description}</p>
  </li>`;
  }
  $('.results-list').html(html);
  $('#search-results').removeClass('hidden');
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getStateParks(query, limit) {
  const params = {
    q: query,
    api_key: apiKey,
    limit
  };
  const queryString = formatQueryParams(params);
  const url = searchUrl + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`)
    });

}

function watchForm() {
  $('#search-tool').submit(event => {
    event.preventDefault();
    let search = $('#state-search').val();
    let resultsNumber = $('#results-number').val();
    getStateParks(search, resultsNumber);
  })
}

function main() {
  watchForm();
}

$(main);