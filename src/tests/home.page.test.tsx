import { render, screen } from "@testing-library/react";
import { useContext, useState } from "react";
import FavMovieProvider, {
  FavMovieContext,
} from "../context/favorites.context";
import HomePage from "../pages/home.page";
import { Movie } from "../types/movie";

test("Home renders", () => {
  render(<HomePage />);
  const formElement = screen.getByTestId("search-form");
  const favMovies = screen.getByText("Favorites");
  expect(formElement).toBeInTheDocument();
  expect(favMovies).toBeInTheDocument();
});

const favMovies: Movie[] = [
  {
    id: 1,
    overview: "overview",
    popularity: 10,
    title: "henlo movie",
    poster_path: "/",
  },
];
const addToFavorites = () => {};

test("Home renders favorites", () => {
  render(
    <FavMovieContext.Provider value={{ favMovies, addToFavorites }}>
      <HomePage />
    </FavMovieContext.Provider>
  );
  const formElement = screen.getByTestId("search-form");
  const favMovieTitle = screen.getByText("Favorites");
  const movieTitle = screen.getByText("henlo movie");
  expect(formElement).toBeInTheDocument();
  expect(favMovieTitle).toBeInTheDocument();
  expect(movieTitle).toBeInTheDocument();
});
