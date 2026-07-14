export interface Genre {
  id: number;
  name: string;
}
export interface Movie{
  id: number,
  title: string,
  original_title: string,
  overview: string,
  poster_path: string | null,
  backdrop_path: string | null,
  release_date: string,
  vote_average: number,
  genre_ids?: number[]; // Popular y Search

  genres?: Genre[];     // Movie Details
  popularity:number,
  runtime:number,
}
