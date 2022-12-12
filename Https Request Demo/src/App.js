import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // used the concept of then funtion to wait till the promise yield the data
  // const fetchMoviesHandler = () => {
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movie) => {
  //         return {
  //           id: movie.episode_id,
  //           title: movie.title,
  //           releaseDate: movie.release_date,
  //           openingText: movie.opening_crawl,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     });
  // };

  // using the concept of async await - alternative approach to then()

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://react-http-2cf20-default-rtdb.firebaseio.com/movies.json"
    );
    const data = await response.json();

    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        releaseDate: data[key].releaseDate,
        openingText: data[key].openingText,
      });
    }

    // const transformedMovies = data.movies.map((movie) => {
    //   return {
    //     id: movie.episode_id,
    //     title: movie.title,
    //     releaseDate: movie.release_date,
    //     openingText: movie.opening_crawl,
    //   };
    // });
    setMovies(loadedMovies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-2cf20-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    //fetchMoviesHandler();
  }

  let content = <p>Found No Movies.</p>;

  if (isLoading) {
    content = <p>Loading.....</p>;
  }

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
