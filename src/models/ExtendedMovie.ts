interface RatingsSummary {
  aggregateRating: number;
  voteCount: number;
  __typename: string;
}

interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: {
    plainText: string;
    __typename: string;
  };
  __typename: string;
}

interface TitleTypeCategory {
  value: string;
  __typename: string;
}

interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  categories: TitleTypeCategory[];
  canHaveEpisodes: boolean;
  __typename: string;
}

interface Genre {
  text: string;
  id: string;
  __typename: string;
}

interface Genres {
  genres: Genre[];
  __typename: string;
}

interface TitleText {
  text: string;
  __typename: string;
}

interface YearRange {
  year: number;
  endYear: number | null;
  __typename: string;
}

interface ReleaseDate {
  day: number;
  month: number;
  year: number;
  __typename: string;
}

interface Runtime {
  seconds: number;
  __typename: string;
}

interface MeterRankChange {
  changeDirection: string;
  difference: number;
  __typename: string;
}

interface TitleMeterRanking {
  currentRank: number;
  rankChange: MeterRankChange;
  __typename: string;
}

interface DisplayableLanguage {
  id: string;
  __typename: string;
}

interface PlotText {
  plainText: string;
  __typename: string;
}

interface Plot {
  plotText: PlotText;
  language: DisplayableLanguage;
  __typename: string;
}

interface ExtendedMovie {
  _id: string;
  id: string;
  ratingsSummary: RatingsSummary;
  episodes: null;
  primaryImage: Image;
  titleType: TitleType;
  genres: Genres;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear: YearRange;
  releaseDate: ReleaseDate;
  runtime: Runtime;
  series: null;
  meterRanking: TitleMeterRanking;
  plot: Plot;
}

export default ExtendedMovie
