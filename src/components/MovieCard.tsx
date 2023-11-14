import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Movie from "../models/Movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
  <a href={`movies/${movie.id}`} className="">
      <Card
    
      sx={{ maxWidth: 200 }}
      className="relative group hover:scale-105 transition-all duration-100 cursor-pointer"
    
    >
      <CardMedia
        sx={{ height: 300, width: 200 }}
        image={movie.primaryImage?.url}
        title="green iguana"
      />

      <CardContent className=" bg-black text-white bg-opacity-40  w-full transition-all duration-150 ease-linear absolute bottom-0 z-10 drop-shadow  font-bold">
        {movie.titleText.text}
      </CardContent>
    </Card>
  </a>
  );
}
