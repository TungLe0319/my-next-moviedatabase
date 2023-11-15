
import { movieService } from "../services/movies";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Stack } from "@mui/material";
import Link from "next/link";
import { Movie } from "@/models/Movie";
import SearchComponent from "@/components/SearchComponent";

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

export default async function Home() {
  const data = await getData();



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
      <Container
        sx={{ display: "flex",flexDirection:'column', alignItems:'center',justifyContent: "center", paddingY: 10 }}
      >
        <div className="text-5xl font-serif">TITLES</div>





<SearchComponent/>

      </Container>
      <Grid
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "center" ,position:'relative'}}
      >
        {data.movies.map((movie: Movie) => (
          <Grid >
            <Link href={`/movies/${movie.id}`}>
              <div className=" m-2 shadow-md hover:scale-105 transition-all duration-100">
                <img
                  src={movie.primaryImage.url}
                  alt=""
                  className="  w-full object-cover h-72 rounded-md"
                />
              </div>
            </Link>
          </Grid>
        ))}

        
      </Grid>
    </main>
  );
}
