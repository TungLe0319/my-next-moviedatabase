"use client";

import Image from "next/image";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { movieService } from "../services/movies";
import Movie from "../models/Movie";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'
import { Container, Stack } from "@mui/material";
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

              <div className=" absolute inset-0  opacity-25 -z-10 blur-3xl   bg-gradient-to-r from-indigo-600 to-slate-400"></div>
            </div>
         
        </Stack>
      </Box>
      <Container sx={{display:'flex',justifyContent:'center',paddingY:20}}>
        <div className="text-5xl">TITLES</div>
      </Container>
      <Grid sx={{ display: "flex", gap: 4, flexWrap: "wrap", padding: 2 }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </main>
  );
}
