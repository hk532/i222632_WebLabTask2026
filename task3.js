const movieCollection = [];

function addMovie(title, director, genre, year) {
  const movie = { title, director, genre, year };
  movieCollection.push(movie);
  console.log(`Added: ${title}`);
}

function listMovies() {
  const formatted = movieCollection
    .map(
      (movie, index) =>
        `${index + 1}. ${movie.title} (${movie.year}) - ${movie.director} [${movie.genre}]`
    )
    .join("\n");
  console.log(formatted);
  return formatted;
}

function searchByDirector(director) {
  const results = movieCollection.filter(
    (movie) =>
      movie.director.toLowerCase() === director.toLowerCase()
  );
  console.log(results);
  return results;
}

function searchByGenre(genre) {
  const results = movieCollection.filter(
    (movie) =>
      movie.genre.toLowerCase() === genre.toLowerCase()
  );
  console.log(results);
  return results;
}

addMovie("abc", "Director1", "Action", 2001);
addMovie("def", "Director2", "Drama", 2002);
addMovie("ghi", "Director1", "Comedy", 2003);
addMovie("jkl", "Director3", "Action", 2004);

listMovies();
searchByDirector("director1");
searchByGenre("action");