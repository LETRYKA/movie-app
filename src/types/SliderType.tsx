export type SliderType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  credits: {
    cast: Array<object>;
    crew: Array<object>;
  };
  genres: Array<object>;
  homepage: string;
  id: number;
  images: {
    backdrops: Array<{
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
    logos: Array<object>;
    posters: Array<{
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
  };
  vote_average: number;
  vote_count: number;
};
