interface CommentType {
  id: number;
  user_id: number;
  user_name: string;
  comment: string;
  commented_at: string;
};

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
  comments?: CommentType[];
  genres: Record<string, string>;
  image: string;
}

interface MovieResponse {
  movie: MovieType
}

interface MoviesResponse {
  total_count: number;
  per_page: number;
  current_page: number;
  movies: MovieType[];
}