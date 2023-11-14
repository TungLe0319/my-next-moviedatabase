interface NameText {
  text: string;
  __typename: string;
}

interface Image {
  url: string;
  width: number;
  height: number;
  __typename: string;
}

interface Name {
  id: string;
  nameText: NameText;
  primaryImage: Image;
  __typename: string;
}

interface MiscellaneousCreditAttribute {
  text: string;
  __typename: string;
}

interface Character {
  name: string;
  __typename: string;
}

interface EpisodeCastConnection {
  total: number;
  yearRange: null; // You might want to replace this with the actual type for yearRange if needed
  __typename: string;
}

interface Node {
  name: Name;
  attributes: MiscellaneousCreditAttribute[];
  characters: Character[];
  episodeCredits: EpisodeCastConnection;
  __typename: string;
}

interface CreditEdge {
  node: Node;
  __typename: string;
}

// Main TypeScript model
export interface ExtendedCast {
  node: Node;
  __typename: string;
}

