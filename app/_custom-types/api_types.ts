import type { User } from './user';
import type { Article } from './article';

// API用 型定義群
export interface UserCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface UserResponse {
  user: User;
}

export interface ErrorResponse {
  errors: { [key: string]: string };
}

// 記事関連の型定義
export interface ArticleResponse {
  article: Article;
}

export interface MultipleArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface UpdateArticle {
  title?: string;
  description?: string;
  body?: string;
}
