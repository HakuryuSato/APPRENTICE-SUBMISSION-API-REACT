export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    bio: string | null;
    image: string | null;
    following?: boolean;
  };
  favorites: string[];
  favorited: boolean;
  favoritesCount: number;
};