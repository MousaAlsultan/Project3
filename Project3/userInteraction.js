const readline = require('readline');
const { getMovies, addMovie, updateMovie, deleteMovie } = require('./movieManager');
const { fetchMovieData } = require('./apiRequests');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function displayMovies() {
  const movies = await getMovies();
  if (movies.length === 0) {
    console.log('No movies found in the catalog.');
  } else {
    console.log('Movie Catalog:');
    movies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.director}, ${movie.releaseYear}) - ${movie.genre}`);
    });
  }
}

async function addNewMovie() {
  const title = await promptUser('Enter the movie title: ');
  const director = await promptUser('Enter the director\'s name: ');
  const releaseYear = await promptUser('Enter the release year: ');
  const genre = await promptUser('Enter the genre: ');

  const movie = {
    title,
    director,
    releaseYear,
    genre,
  };

  await addMovie(movie);
}

async function updateMovieDetails() {
  const movies = await getMovies();
  if (movies.length === 0) {
    console.log('No movies found in the catalog.');
    return;
  }

  const movieIndex = parseInt(await promptUser('Enter the movie index to update: '), 10);
  if (isNaN(movieIndex) || movieIndex < 1 || movieIndex > movies.length) {
    console.log('Invalid movie index.');
    return;
  }

  const movie = movies[movieIndex - 1];

  console.log('Current Details:');
  console.log(`Title: ${movie.title}`);
  console.log(`Director: ${movie.director}`);
  console.log(`Release Year: ${movie.releaseYear}`);
  console.log(`Genre: ${movie.genre}`);

  const updatedTitle = await promptUser('Enter the updated title (leave blank to keep the current value): ');
  const updatedDirector = await promptUser('Enter the updated director (leave blank to keep the current value): ');
  const updatedReleaseYear = await promptUser('Enter the updated release year (leave blank to keep the current value): ');
  const updatedGenre = await promptUser('Enter the updated genre (leave blank to keep the current value): ');

  const updatedMovie = {
    title: updatedTitle || movie.title,
    director: updatedDirector || movie.director,
    releaseYear: updatedReleaseYear || movie.releaseYear,
    genre: updatedGenre || movie.genre,
  };

  await updateMovie(movieIndex - 1, updatedMovie);
}

async function deleteMovieFromCatalog() {
  const movies = await getMovies();
  if (movies.length === 0) {
    console.log('No movies found in the catalog.');
    return;
  }

  const movieIndex = parseInt(await promptUser('Enter the movie index to delete: '), 10);
  if (isNaN(movieIndex) || movieIndex < 1 || movieIndex > movies.length) {
    console.log('Invalid movie index.');
    return;
  }

  await deleteMovie(movieIndex - 1);
}

async function searchMovies() {
  const searchTerm = await promptUser('Enter the search term: ');
  const movies = await getMovies();

  const matchingMovies = movies.filter((movie) => {
    const { title, director, genre } = movie;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      title.toLowerCase().includes(lowerCaseSearchTerm) ||
      director.toLowerCase().includes(lowerCaseSearchTerm) ||
      genre.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  if (matchingMovies.length === 0) {
    console.log('No matching movies found.');
  } else {
    console.log('Matching Movies:');
    matchingMovies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.director}, ${movie.releaseYear}) - ${movie.genre}`);
    });
  }
}

async function filterMovies() {
  const filterOption = await promptUser('Enter the filter option (genre/release year): ');

  if (filterOption === 'genre') {
    const genreFilter = await promptUser('Enter the genre to filter: ');
    const movies = await getMovies();

    const filteredMovies = movies.filter((movie) => movie.genre.toLowerCase() === genreFilter.toLowerCase());

    if (filteredMovies.length === 0) {
      console.log('No movies found for the given genre.');
    } else {
      console.log(`Movies in the ${genreFilter} genre:`);
      filteredMovies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.director}, ${movie.releaseYear}) - ${movie.genre}`);
      });
    }
  } else if (filterOption === 'release year') {
    const yearFilter = await promptUser('Enter the release year to filter: ');
    const movies = await getMovies();

    const filteredMovies = movies.filter((movie) => movie.releaseYear === yearFilter);

    if (filteredMovies.length === 0) {
      console.log('No movies found for the given release year.');
    } else {
      console.log(`Movies released in ${yearFilter}:`);
      filteredMovies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.director}, ${movie.releaseYear}) - ${movie.genre}`);
      });
    }
  } else {
    console.log('Invalid filter option.');
  }
}

async function fetchAndAddMovie() {
  const movieTitle = await promptUser('Enter the movie title to fetch: ');

  const movieData = await fetchMovieData(movieTitle);
  if (movieData) {
    const { Title, Director, Year, Genre } = movieData;

    const movie = {
      title: Title,
      director: Director,
      releaseYear: Year,
      genre: Genre,
    };

    await addMovie(movie);
  }
}

module.exports = {
  displayMovies,
  addNewMovie,
  updateMovieDetails,
  deleteMovieFromCatalog,
  searchMovies,
  filterMovies,
  fetchAndAddMovie,
};
