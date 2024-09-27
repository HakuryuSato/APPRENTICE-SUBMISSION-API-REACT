import type { Article } from "@custom-types/article";

const API_URL = 'http://localhost:3000/api';

// ユーザー関連の型定義
interface UserCredentials {
  email: string;
  password: string;
  username?: string;
}

interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
}

interface UserResponse {
  user: User;
}

interface ErrorResponse {
  errors: { [key: string]: string[] };
}



interface ArticleResponse {
  article: Article;
}

interface MultipleArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

interface UpdateArticle {
  title?: string;
  description?: string;
  body?: string;
}

// ヘッダーを取得するヘルパー関数（認証が必要な場合はトークンを含む）
function getHeaders(authenticated = false): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (authenticated) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }
    }
  }
  return headers;
}

// エラーハンドリング用のヘルパー関数
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw errorData;
  }
  return response.json();
}

// 認証関連の関数

// ユーザー登録
export async function registerUser(user: UserCredentials): Promise<UserResponse> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ user }),
  });
  return handleResponse<UserResponse>(response);
}

// ログイン
export async function loginUser(user: UserCredentials): Promise<UserResponse> {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ user }),
  });
  const data = await handleResponse<UserResponse>(response);
  if (data.user && data.user.token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.user.token);
    }
  }
  return data;
}

// 記事関連の関数

// 全ての記事を取得（ページネーション対応）
export async function getAllArticles(offset = 0, limit = 10): Promise<MultipleArticlesResponse> {
    const response = await fetch(`${API_URL}/articles?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse<MultipleArticlesResponse>(response);
  }

// 特定のユーザーがお気に入りした記事を取得
export async function getArticlesFavoritedBy(username: string): Promise<MultipleArticlesResponse> {
  const response = await fetch(`${API_URL}/articles?favorited=${encodeURIComponent(username)}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse<MultipleArticlesResponse>(response);
}

// 新しい記事を作成
export async function createArticle(article: NewArticle): Promise<ArticleResponse> {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({ article }),
  });
  return handleResponse<ArticleResponse>(response);
}

// スラッグで記事を取得
export async function getArticle(slug: string): Promise<ArticleResponse> {
  const response = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse<ArticleResponse>(response);
}

// 記事を更新
export async function updateArticle(slug: string, article: UpdateArticle): Promise<ArticleResponse> {
  const response = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify({ article }),
  });
  return handleResponse<ArticleResponse>(response);
}

// 記事をお気に入り登録
export async function favoriteArticle(slug: string): Promise<ArticleResponse> {
  const response = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: getHeaders(true),
  });
  return handleResponse<ArticleResponse>(response);
}

// 記事のお気に入り登録を解除
export async function unfavoriteArticle(slug: string): Promise<ArticleResponse> {
  const response = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });
  return handleResponse<ArticleResponse>(response);
}

// 記事を削除
export async function deleteArticle(slug: string): Promise<void> {
  const response = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });
  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw errorData;
  }
}
