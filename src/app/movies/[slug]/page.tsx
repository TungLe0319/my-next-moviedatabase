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
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Use the slug parameter in your API request or other logic
      const data = await movieService.fetchMovieById(slug)

      if (data) {
        setMovie(data.results);
      }
    };

    fetchData();
  }, [slug]); // Make sure to include slug in the dependency array

  return (
    <main className="flex bg-white text-black  min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex ">
       
      <img className='h-auto w-full' src={movie?.primaryImage.url} alt={movie?.primaryImage.__typename} />




{movie?.originalTitleText.text}
{movie?.releaseDate}
{movie?.releaseYear.year}
{movie?.releaseYear.endYear}
{movie?.titleText.text}
{movie?.originalTitleText.text}

     



      </div>
    </main>
  )}
