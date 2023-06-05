const fetch = require('node-fetch');

async function fetchMovieData(title) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=YOUR_API_KEY`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
}

module.exports = {
  fetchMovieData,
};
