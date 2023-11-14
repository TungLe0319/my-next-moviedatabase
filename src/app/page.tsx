"use client";

import Image from "next/image";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { movieService } from "../services/movies";
import Movie from "../models/Movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.fetchMovies()
      // console.log(data);

      if (data) {
        setMovies(data.results);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex  min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex gap-3 flex-wrap">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
