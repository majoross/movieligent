import React, { createContext } from "react";

export type MovieResult ={
    page: number;
    results: Movie[];
    total_pages: number;
}

export type Movie ={
    id:number;
    overview: string;
    popularity: number;
    title: string;
    poster_path: string;
}

