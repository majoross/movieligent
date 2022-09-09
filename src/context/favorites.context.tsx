import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Movie, MovieResult } from "../types/movie";

const initialState: Movie[] = [];
const checkLocalStorageForInitialState = (): Movie[] => {
  const localItems = localStorage.getItem("favMovies");
  if (localItems) {
    return JSON.parse(localItems);
  } else {
    return initialState;
  }
};

export interface FavoritesContextType {
  favMovies: Movie[];
  addToFavorites: (movie: Movie) => void;
}
export const FavMovieContext = createContext<FavoritesContextType>({
  favMovies: initialState,
  addToFavorites: () => {},
});

const FavMovieProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [favMovies, setFavMovies] = useState<Movie[]>(
    checkLocalStorageForInitialState
  );

  const addToFavorites = (movie: Movie) => {
    if (favMovies.some((fm) => fm.id === movie.id)) {
      return;
    }
    setFavMovies((prevState: Movie[]) => [...prevState, movie]);
  };

  return (
    <FavMovieContext.Provider value={{ favMovies, addToFavorites }}>
      {children}
    </FavMovieContext.Provider>
  );
};

export default FavMovieProvider;
