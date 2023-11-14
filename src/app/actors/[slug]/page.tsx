"use client";

import { useRouter } from "next/router";
import Image from "next/image";
import MovieCard from "../../../components/MovieCard";
import { useEffect, useState } from "react";

import Movie from "../../../models/Movie";
import { movieService } from "@/services/movies";
import { useParams } from "next/navigation";
import ExtendedCast from "@/models/ExtendedCast";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  styled,
  ListItemButton,
} from "@mui/material";

export default function ActorPage() {
  const params = useParams();
  const { slug } = params; // Access the slug from the URL params

  const [movie, setMovie] = useState<Movie>();
  const [main_actors, setMain_actors] = useState<ExtendedCast[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
    console.log(slug);
    
    };

    fetchData();
  }, [slug]); // Make sure to include slug in the dependency array

  return (
    <main className=" min-h-screen flex-col items-center justify-between p-24">
      <div className="  pb-5 ">
        <div className="">
          <h1 className="text-4xl"> {movie?.titleText.text} </h1>
          <div className="flex">
         HELLO
            <span></span>
          </div>
        </div>
     
      </div>

    </main>
  );
}
