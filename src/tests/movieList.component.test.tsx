import { cleanup, render, screen } from "@testing-library/react";
import { MovieList } from "../components/movieList/movieList.component";
import { Movie } from "../types/movie";

const movieList: { pages: number; movies: Movie[] } = {
  pages: 1,
  movies: [
    {
      id: 1,
      overview: "overview",
      popularity: 10,
      title: "henlo movie",
      poster_path: "/",
    },
  ],
};

afterEach(() => {
  cleanup();
});

test("Movie list renders with movies", () => {
  render(<MovieList spinner={false} movieList={movieList} />);
  const moviesElement = screen.getByTestId("movie-list");
  const movieTitle = screen.getByText("henlo movie");
  const movieoverview = screen.getByText("overview");
  expect(moviesElement).toBeInTheDocument();
  expect(movieTitle).toBeInTheDocument();
  expect(movieoverview).toBeInTheDocument();
});

test("Movie list spins", () => {
  render(<MovieList spinner={true} movieList={movieList} />);
  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
});
