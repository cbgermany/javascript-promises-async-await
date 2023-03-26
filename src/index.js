import { 
  fetchWithTimeout, 
  fetchMovies, 
  fetchBooks, 
  asyncFetchBooks,
  asyncFetchMovies
} from './services';
const movies = require('./data/movies.json');

// Get Books and Movies using a Promise
const getBooksAndMovies = () => {
  return Promise.all([fetchBooks(), fetchMovies()])
    .then(([books, movies]) => ({
      books,
      movies,
    }))
    .catch(error = console.log('Error fetching books and movies', error))
};

const getBooksAndMoviesPromise = getBooksAndMovies();
getBooksAndMoviesPromise.then(results => {
  console.log('getBooksAndMoviesPromise', results);
});

// Get Books Or Movies using a Promise
function getBooksOrMovies() {
  return Promise.race([fetchBooks(), fetchMovies()])
    .then(results => results)
    .catch(error => {
      console.log("Error waiting for the promice race", error);
    });
}

const getBooksOrMoviesPromise = getBooksOrMovies();
getBooksOrMoviesPromise.then(results => {
  console.error('getBooksOrMoviesPromise', results);
});

// Get Books and Movies using async/await
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

// Get Books or Movies using async/await
async function getBooksOrMoviesAsync() {
  const values = await Promise.race([asyncFetchBookss(), asyncFetchMovies()])
  return values;
}

getBooksOrMoviesAsync()
  .then(results => {
    console.log("movies OR books", {
      results
    });
  })
  .catch(error =>
    console.error("Error in getBooksOrMoviesAsync execution", error)
  );

  const timer1 = setTimeout(() => {
    console.log("timer 1 has finished")
  }, 3000);

  const timer2 = setTimeout(() => {
    console.log("timer 2 has finished")
    clearTimeout(timer1)
  }, 2000);

