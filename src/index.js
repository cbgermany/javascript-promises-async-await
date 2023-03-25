import { fetchWithTimeout, ferchMovies, fetchBooks } from './services';
const movies = require('./data/movies.json');

const getBooksAndMovies = () => {
  return Promise.all([fetchBooks(), fetchMoview()])
    .then(([books, movies]) => ({
      books,
      movies,
    }))
    .catch(error = console.log('Error fetching books and movies', error))
};

