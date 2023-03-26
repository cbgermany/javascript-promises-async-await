import { fetchWithTimeout, fetchMovies, fetchBooks, asyncFetchMovies, asyncFetchBooks } from './services';
const movies = require('./data/movies.json');


const getBooksAndMovies = () => {
  return Promise.all([fetchBooks(), fetchMovies()])
    .then(([books, movies]) => ({
      books,
      movies,
    }))
    .catch(error = console.log('Error fetching books and movies', error))
};

async function getBooksAndMoviesAsync() {
  try {
    const [books, movies] = await Promise.all([asyncFetchBooks(), asyncFetchMovies()])
    return { books, movies };
  }
  catch(error) {
    console.log('Error fetching books and movies', error);
    return error;
  }
}

const getBooksAndMoviesPromise = getBooksAndMovies();
getBooksAndMoviesPromise.then(results => {
  console.log('getBooksAndMoviesPromise', results);
});

async function getBooksOrMoviesAsync() {
  const values = await Promise.race([asyncFetchBooks(), asyncFetchMovies()])
  return values;
}

const getBooksOrMovies = () => {
  return Promise.race([fetchBooks(), fetchMovies()])
    .then(results => results)
    .catch(error => console.log("Error waiting for the promice race", error))
};

const getBooksOrMoviesPromise = getBooksOrMovies();
getBooksOrMoviesPromise.then(results => {
  console.error('getBooksOrMoviesPromise', results);
});

getBooksAndMoviesAsync()
  .then(results => {
    console.log('movies AND books', {
      movies: results.movies,
      books: results.books,
    });
  })
  .catch(error => {
    console.error("Error in getBooksAndMoviesAsync execution", error);
  });


getBooksOrMoviesAsync()
  .then(results => {
    console.log("movies OR books", {
      results
    });
  })
  .catch(error =>
    console.error("Error in getBooksOrMoviesAsync execution", error)
  );
