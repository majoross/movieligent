import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Movie, MovieResult } from "../types/movie";

const initialState: MovieResult = {
  page: 0,
  results: [],
  total_pages: 1,
};

export interface MovieContextType {
  movies: MovieResult;
  setMovies: (movies: MovieResult) => void;
}
export const MovieContext = createContext<MovieContextType>({
  movies: initialState,
  setMovies: () => {},
});

const MovieProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [movies, setMovies] = useState<MovieResult>(initialState);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
