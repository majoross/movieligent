import { useContext } from "react";
import { FavMovieContext } from "../../context/favorites.context";
import { Movie } from "../../types/movie";
import "./movieCard.styles.scss";
export interface IMovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  const { favMovies, addToFavorites } = useContext(FavMovieContext);
  const { id, poster_path, overview, popularity, title } = movie;
  return (
    <div className="movie-card" key={id}>
      <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt={title} />
      <p className="movie-title">{title}</p>
      <div className="movie-overview">{overview}</div>
      <p className="movie-rating">Score: {popularity.toFixed(1)}</p>
      <button className="add-to-fav" onClick={() => addToFavorites(movie)}>
        Add to favorites
      </button>
    </div>
  );
};

export default MovieCard;
