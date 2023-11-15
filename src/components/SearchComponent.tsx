"use client";

import React, { useState, useMemo } from "react";
import { movieService } from "@/services/movies";
import { Movie } from "@/models/Movie";
import Link from "next/link";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const delayedSearchMovies = useMemo(() => {
    let timeoutId: NodeJS.Timeout;

    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const response = await movieService.searchMovies(value);

        if (response === null) {
          setMovies([]);
        } else setMovies(response.results);
      }, 1000); // Wait for 0.5 seconds before making the request
    };
  }, [setMovies]);

  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchTerm(value);
    delayedSearchMovies(value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        className="p-1 rounded-md text-black"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />

      {movies ? (
        <div className="flex flex-wrap p-10">
          {movies.map((movie) => (
            <div key={movie.id} className="">
              {movie.primaryImage?.url ? (
                <Link href={`/movies/${movie.id}`}>
                  <div className="shadow-md hover:scale-105 transition-all duration-100">
                    <img
                      src={movie.primaryImage?.url}
                      alt=""
                      className="w-44 object-cover h-72 rounded-md"
                    />
                  </div>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchComponent;
