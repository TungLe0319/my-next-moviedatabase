'use client'



import Box from "@mui/material/Box";

import {  Stack } from "@mui/material";

import React, { useState, useMemo } from "react";
import { Movie } from "@/models/Movie";
import Link from "next/link";
import { MovieList } from "@/components/MovieList";

import { movieService } from "@/services/movies";


export default  function Home() {
   const [movies, setMovies] = useState<Movie[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className="flex  min-h-screen flex-col items-center justify-center p-24">
      <Box>
        <Stack direction="row" spacing={2}>
          <Box>
            <div className="text-6xl font-serif">The Next Movie Database</div>
            <div className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              minima cumque nostrum magni, doloremque ex natus nam a molestias,
              iusto architecto odio qui ea animi?
            </div>
          </Box>

          <div className="relative flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className=" w-1/2 rounded-md shadow-md"
            />

            <div className=" absolute -top-12 right-0 left-0 bottom-0  h-96  opacity-25 -z-10 blur-3xl   bg-gradient-to-r from-indigo-600 to-slate-400"></div>
          </div>
        </Stack>
      </Box>
      <div className="my-10">
        <div className="text-5xl font-serif">TITLES</div>
{/* 
        <SearchComponent
          movies={movies}
          setMovies={setMovies}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        /> */}
      </div>
      {searchTerm === ''  ? (
        <MovieList />
      ) : (
        <div className="flex flex-wrap p-10">
          {movies.map(
            (movie: {
              id: React.Key | null | undefined;
              primaryImage: { url: string | undefined };
            }) => (
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
            )
          )}
        </div>
      )}
    </main>
  );
}


const SearchComponent = ({ movies, setMovies, searchTerm, setSearchTerm }) => {
  const delayedSearchMovies = useMemo(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const response = await movieService.searchMovies(value);

        if (response === null) {
          setMovies([]);
        } else setMovies(response.results);
      }, 1000); // Wait for 1 second before making the request
    };
  }, [setMovies]);

  const handleInputChange = (e: { target: { value: any; }; }) => {
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

    
    </div>
  );
};