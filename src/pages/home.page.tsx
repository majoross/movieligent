import { Pagination } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { MovieList } from "../components/movieList/movieList.component";
import { FavMovieContext } from "../context/favorites.context";
import { MovieContext } from "../context/movies.context";
import { MovieResult } from "../types/movie";
import debounce from "lodash.debounce";
import "./home.styles.scss";

export const fetchMovies = async (
  searchTerm: string,
  page: number
): Promise<MovieResult> => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=c4aaa0f750d68042dc4f524949c52eee&query=${searchTerm}&page=${page}&include_adult=false`;
  const result: MovieResult = await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((movies: MovieResult) => {
      console.log(movies.results);
      return movies;
    })
    .catch((error) => error.message);

  return result;
};

// useQuery<Promise<MovieResult>>("henlo", fetchMovies);
const HomePage = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const [spinner, setSpinner] = useState(false);
  const [searchValue, setSearchvalue] = useState("");
  const [page, setPage] = useState(1);
  const { favMovies, addToFavorites } = useContext(FavMovieContext);

  useEffect(() => {
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  }, [favMovies]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setSearchvalue(event.target.value);
    }
  };

  const debouncedChange = useCallback(debounce(onChangeHandler, 300), []);

  useEffect(() => {
    if (searchValue.length >= 3) {
      getMovies(searchValue, null, 1);
    }
  }, [searchValue]);

  const getMovies = async (
    searchValue: string,
    event: React.FormEvent<HTMLFormElement> | null,
    page: number
  ) => {
    event && event.preventDefault();
    setSpinner(true);
    setMovies(await fetchMovies(searchValue, page));
    setSpinner(false);
  };

  const pageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const fetch = async () => setMovies(await fetchMovies(searchValue, page));
    fetch();
  }, [page]);

  return (
    <div className="home-container">
      <form
        data-testid="search-form"
        onSubmit={(event) => getMovies(searchValue, event, 1)}
      >
        <label htmlFor="search-input">Movie title</label>
        <input
          id="search-input"
          placeholder="Enter a movie title..."
          onChange={debouncedChange}
        />
        <button type="submit">Search Movies</button>
      </form>
      <div>Search Result</div>
      <div className="movies-container">
        <MovieList
          movieList={{ pages: movies.page, movies: movies.results }}
          spinner={spinner}
        ></MovieList>
        <div className="fav-movies">
          <h2>Favorites</h2>
          {favMovies.length > 0 &&
            favMovies.map((favs) => <div>{favs.title}</div>)}
        </div>
      </div>
      <Pagination
        count={movies.total_pages}
        page={movies.page}
        onChange={pageChange}
      />
    </div>
  );
};

export default HomePage;
