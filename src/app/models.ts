export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publisher>;
  ratings: Array<Rating>;
  screenshots_count: number;
  short_screenshots: Array<Screenshot>;
  movies: Array<Trailer>;
}

export interface APIResponse<T> {
  results: Array<T>;
}

interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    name: string;
    slug: string;
  };
}

interface Publisher {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshot {
  id: number;
  image: string;
}

interface Trailer {
  data: {
    max: string;
  };
}
