import Paper from "@mui/material/Paper/Paper";
import Box from "@mui/material/Box";
import { movieService } from "@/services/movies";
import {
  List,
  Avatar,
  Stack,
  Skeleton,
  Grid,
  Card,
  Badge,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { formatRuntime } from "@/utils/formatRuntime";
import { ExtendedCast } from "@/models/ExtendedCast";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Title } from "@mui/icons-material";
import ExtendedMovie from "@/models/ExtendedMovie";
import { Movie } from "@/models/Movie";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import StarIcon from "@mui/icons-material/Star";
import LanguageIcon from '@mui/icons-material/Language';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";








export default async function MoviePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { movie, main_actors } = await getData(params.slug);
  return (
    <main className="   bg-gradient-to-br from-gray-950 via-gray-800 to-emerald-400 min-h-screen flex-col items-center justify-between p-10">
      <MovieDetails movie={movie} />
      <Box>
        <div className="text-6xl font-serif mb-12  mt-20">Main Cast</div>
      </Box>
      {movie ? (
        <Grid container spacing={2}>
          {main_actors.map((actor: ExtendedCast) => (
            <Grid item xs={12} md={6} xl={4}>
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
            </Grid>
          ))}
        </Grid>
      ) : (
        <Skeleton variant="rectangular" width={600} height={600} />
      )}
    </main>
  );
}

const MovieDetails = ({ movie }: { movie: ExtendedMovie }) => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h1" className="text-6xl font-serif">
            {movie?.titleText.text}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", my: 4, gap: 3 }}>
            <span>{movie?.releaseYear?.year}</span>
            <span>{movie?.titleType?.text}</span>
            <span>{formatRuntime(movie?.runtime?.seconds!)}</span>
          </Box>
          <img
            src={movie?.primaryImage?.url}
            alt={movie?.primaryImage?.caption?.plainText}
            className="h-auto w-3/6 rounded-md shadow-md"
          />
          <Box sx={{ display: "flex", mt: 4, gap: 1 }}>
            {movie?.genres.genres.map((genre) => (
              <Chip
                key={genre.text}
                sx={{ bgcolor: "silver" }}
                label={genre.text}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent:'center' }}
        >
          <Card sx={{ backgroundColor: "" }}>
            <CardHeader
              avatar={
                <Avatar>
                  <LanguageIcon />
                </Avatar>
              }
              title={
                <Typography variant="body1">
                  Language: {movie?.plot?.language.id}
                </Typography>
              }
            />
          </Card>
          <Card sx={{ backgroundColor: "" }}>
            <CardHeader
              avatar={<Avatar></Avatar>}
              title={
                <Typography variant="body1">
                  Rank: {movie?.meterRanking.currentRank}
                </Typography>
              }
            />
          </Card>
          <Card sx={{ backgroundColor: "" }}>
            <CardHeader
              avatar={
                <Avatar>
                  <StarIcon />
                </Avatar>
              }
              title={
                <Typography variant="body1">
                  Rating: {movie?.ratingsSummary.aggregateRating}
                </Typography>
              }
            />
          </Card>
          <Card sx={{ backgroundColor: "" }}>
            <CardHeader
              avatar={
                <Avatar>
                  <ThumbUpIcon />
                </Avatar>
              }
              title={
                <Typography variant="body1">
                  VoteCount: {movie?.ratingsSummary.voteCount}
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="body1">
                {movie?.plot?.plotText?.plainText}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

async function getData(slug: string) {
  // Fetch movie data
  const data = await movieService.fetchMovieById(slug as string);
  const mainActorData = await movieService.fetchMovieMainActors(slug as string);

  if (!data || !mainActorData) {
    return {
      notFound: true,
    };
  }

  return {
    movie: data.results as ExtendedMovie,
    main_actors: mainActorData.results.cast.edges,
  };
}
