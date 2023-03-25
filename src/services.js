export function fetchWithTimeout(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export function fetchMovies(){
  return fetch("./data/movies.json")
    .then(response => response.json())
    .then(movie => movies)
    .catch(error => console.log(error));
    
  const resolveFunction = () => movies;

  return fetchWithTimeout(1000).then(resolveFunction);
}

const moviePromise = fetchMovies();