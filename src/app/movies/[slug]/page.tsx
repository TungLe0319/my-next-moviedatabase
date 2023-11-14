import Paper from "@mui/material/Paper/Paper";
import Box from "@mui/material/Box";
import { movieService } from "@/services/movies";
import { List, Avatar, Stack, Skeleton } from "@mui/material";
import Link from "next/link";
import { formatRuntime } from "@/utils/formatRuntime";

export default async function MoviePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { movie, main_actors } = await getData(params.slug);
  return (
    <main className="   bg-gradient-to-br from-gray-950 via-gray-800 to-emerald-400 min-h-screen flex-col items-center justify-between p-44">
      <Box className="  flex  pb-5 ">
        <div className="w-1/2">
          <div className="">
            <h1 className="text-6xl  font-serif"> {movie?.titleText.text} </h1>
            <div className="flex space-x-3 my-4">
              <span>{movie?.releaseYear.year}</span>
              <span>{movie?.titleType.text}</span>
              <span>{formatRuntime(movie?.runtime.seconds!)}</span>
            </div>
          </div>
          <img
            className="h-auto w-2/6 rounded-md shadow-md"
            src={movie?.primaryImage.url}
            alt={movie?.primaryImage.caption.plainText}
          />
        </div>
        <div className=" w-1/2   flex items-center ">
          {movie?.plot.plotText.plainText}
        </div>
      </Box>

      {movie ? (
        <List sx={{ maxWidth: 400 }}>
          {main_actors.map((actor) => (
            <Paper elevation={3} sx={{ marginY: 2 }}>
              <Link
                key={actor.node.name.id}
                href={`/actors/${actor.node.name.id}`}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 1,
                    padding: 2,
                  }}
                  className="hover:bg-slate-200/20 transition-all duration-150 ease-linear"
                >
                  {actor.node.name.primaryImage?.url ? (
                    <Avatar
                      alt={actor.node.name.nameText.text}
                      src={actor.node.name.primaryImage?.url}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Skeleton
                      sx={{ bgcolor: "gray" }}
                      variant="circular"
                      width={56}
                      height={56}
                    />
                  )}
                  <div className="flex flex-col justify-center items-center">
                    <div className=" font-bold">
                      {actor.node.name.nameText.text}
                    </div>
                    {actor.node.characters.map((character) => (
                      <div
                        key={character.name}
                        className="  text-sm  text-slate-400"
                      >
                        {character.name}
                      </div>
                    ))}
                  </div>
                </Stack>
              </Link>
            </Paper>
          ))}
        </List>
      ) : (
        <Skeleton variant="rectangular" width={600} height={600} />
      )}
    </main>
  );
}

async function getData(slug:string) {
  // Fetch movie data
  const data = await movieService.fetchMovieById(slug as string);
  const mainActorData = await movieService.fetchMovieMainActors(slug as string);

  if (!data || !mainActorData) {
    return {
      notFound: true,
    };
  }

  

  return {
    movie: data.results,
    main_actors: mainActorData.results.cast.edges,
  };
}
