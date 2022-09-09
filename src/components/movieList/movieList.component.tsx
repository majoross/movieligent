import { CircularProgress } from "@mui/material";
import { Movie } from "../../types/movie";
import MovieCard from "./movieCard.component";
import "./movieList.styles.scss";

export interface IMovieListProps {
  movieList: { pages: number; movies: Movie[] };
  spinner: boolean;
}

export function MovieList({ movieList, spinner }: IMovieListProps) {
  return (
    <div>
      {!spinner ? (
        <div className="movie-list-container" data-testid="movie-list">
          {movieList.movies &&
            movieList.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
        </div>
      ) : (
        <CircularProgress data-testid="spinner" />
      )}
    </div>
  );
}
