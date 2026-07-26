export interface Genre {
  id: number;
  name: string;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  air_date: string | null;
  poster_path: string | null;
}

export interface Tv {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;

  first_air_date: string;
  last_air_date?: string;

  vote_average: number;
  vote_count: number;

  popularity: number;

  original_language: string;

  genre_ids?: number[];
  genres?: Genre[];

  seasons?: Season[];

  episode_run_time?: number[];

  number_of_seasons?: number;
  number_of_episodes?: number;

  season?: Season;

  status?: string;
  in_production?: boolean;


}
