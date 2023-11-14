"use client";

import { useRouter } from 'next/router';
import Image from "next/image";
import MovieCard from "../../../components/MovieCard";
import { useEffect, useState } from "react";

import Movie from "../../../models/Movie";
import { movieService } from '@/services/movies';
import { useParams } from 'next/navigation';

export default function MovieSlugPage() {
  const params = useParams()
  const { slug } = params; // Access the slug from the URL params

  const [movie, setMovie] = useState<Movie>();
  const [main_actors,setMain_actors] = useState([])
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Use the slug parameter in your API request or other logic
      const data = await movieService.fetchMovieById(slug as string)
const  mainActorData = await movieService.fetchMovieMainActors(movie?.id as string)
      if (data && mainActorData) {
        setMovie(data.results);
        setMain_actors(mainActorData.results)
      }
    };

    fetchData();
  }, [slug]); // Make sure to include slug in the dependency array

  return (
    <main className="flex   min-h-screen flex-col items-center justify-between p-24">
      <div className="  ">
        <div className="">
          <h1 className="text-4xl"> {movie?.titleText.text} </h1>
          <div className="flex">
            <span>{movie?.releaseYear.year}-</span> 
            <span>{movie?.titleType.text}-</span>
            <span></span>
          </div>
        </div>
        <img
          className="h-auto w-1/5 rounded-md"
          src={movie?.primaryImage.url}
          alt={movie?.primaryImage.caption.plainText}
        />
      </div>

     {movie?._id}
    </main>
  );}
