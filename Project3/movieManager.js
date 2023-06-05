const { readDataFromFile, writeDataToFile } = require('./fileHandler');

async function getMovies() {
  try {
    const movies = await readDataFromFile('./data/movies.json');
    return movies;
  } catch (error) {
    console.error('Error reading movie data:', error);
    return [];
  }
}

async function addMovie(movie) {
  try {
    const movies = await getMovies();
    movies.push(movie);
    await writeDataToFile('./data/movies.json', movies);
    console.log('Movie added successfully.');
  } catch (error) {
    console.error('Error adding movie:', error);
  }
}

async function updateMovie(movieIndex, updatedMovie) {
  try {
    const movies = await getMovies();
    movies[movieIndex] = updatedMovie;
    await writeDataToFile('./data/movies.json', movies);
    console.log('Movie updated successfully.');
  } catch (error) {
    console.error('Error updating movie:', error);
  }
}

async function deleteMovie(movieIndex) {
  try {
    const movies = await getMovies();
    movies.splice(movieIndex, 1);
    await writeDataToFile('./data/movies.json', movies);
    console.log('Movie deleted successfully.');
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
}

module.exports = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
