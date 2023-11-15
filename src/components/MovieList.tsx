import { movieService } from "@/services/movies";

import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { Movie } from "@/models/Movie";

export const MovieList = async () => {
 
  const data = await getData();
  return (
    <Grid
      container
      spacing={4}
      sx={{ display: "flex", justifyContent: "center", position: "relative" }}
    >
      {data.movies.map((movie: Movie) => (
        <Grid  key={movie.id} xs={2.25}>
          <Link href={`/movies/${movie.id}`}>
            <div className="  shadow-md hover:scale-105 transition-all duration-100">
              <img
                src={movie.primaryImage.url}
                alt=""
                className="   w-52 object-cover h-72 rounded-md"
              />
            </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
async function getData() {
  // Fetch movie data
  const data = await movieService.fetchMovies();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    movies: data.results,
    nextPage: data.next,
  };
}
