const { displayMovies, addNewMovie, updateMovieDetails, deleteMovieFromCatalog, searchMovies, filterMovies, fetchAndAddMovie } = require('./modules/userInteraction');

async function main() {
  console.log('Movie Catalog CLI Application\n');

  while (true) {
    console.log('\n--- MENU ---');
    console.log('1. Display Movie Catalog');
    console.log('2. Add New Movie');
    console.log('3. Update Movie Details');
    console.log('4. Delete Movie');
    console.log('5. Search Movies');
    console.log('6. Filter Movies');
    console.log('7. Fetch Movie Data');
    console.log('8. Exit');

    const choice = parseInt(await promptUser('Enter your choice: '), 10);
    console.log();

    switch (choice) {
      case 1:
        await displayMovies();
        break;
      case 2:
        await addNewMovie();
        break;
      case 3:
        await updateMovieDetails();
        break;
      case 4:
        await deleteMovieFromCatalog();
        break;
      case 5:
        await searchMovies();
        break;
      case 6:
        await filterMovies();
        break;
      case 7:
        await fetchAndAddMovie();
        break;
      case 8:
        rl.close();
        process.exit();
      default:
        console.log('Invalid choice.');
    }
  }
}

main();
