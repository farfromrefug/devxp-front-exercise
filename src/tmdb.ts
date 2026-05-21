import axios from "axios";

const API_KEY = "1d868d05865a228a5fb2fc24c37d7b36";
const BASE_URL = "https://api.themoviedb.org/3";

export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
};

type TmdbListResponse = { results: Movie[] };

export const fetchNowPlaying = (): Promise<Movie[]> =>
  axios
    .get<TmdbListResponse>(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&region=FR`,
    )
    .then((r) => r.data.results);

export const fetchSearch = (query: string): Promise<Movie[]> =>
  axios
    .get<TmdbListResponse>(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`,
    )
    .then((r) => r.data.results);
