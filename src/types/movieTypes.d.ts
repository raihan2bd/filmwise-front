interface MovieType {
  id: number;
  title: string;
  description: string;
  year: number;
  release_date: string;
  runtime: number;
  rating: number;
  total_favorites: number;
  is_favorite: boolean;
  total_comments: number;
  genres: Record<string, string>;
  image: string;
}

interface MoviesResponse {
  total_count: number;
  per_page: number;
  current_page: number;
  movies: Movie[];
}
