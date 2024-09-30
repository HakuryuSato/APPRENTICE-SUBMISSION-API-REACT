import { NextResponse } from 'next/server';
import { loadJsonData, saveJsonData } from '@utils/jsonStorageHandler';
import type { Article } from '@custom-types/article';
import { getCurrentUser } from '@utils/auth';

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const currentUser = await getCurrentUser(req);
  if (!currentUser) {
    return NextResponse.json({ errors: { message: 'Unauthorized' } }, { status: 401 });
  }

  const articles = await loadJsonData<Article>('articles');
  const articleIndex = articles.findIndex((a) => a.slug === params.slug);

  if (articleIndex === -1) {
    return NextResponse.json({ errors: { message: 'Article not found' } }, { status: 404 });
  }

  const article = articles[articleIndex];

  if (!article.favorites) {
    article.favorites = [];
  }

  if (!article.favorites.includes(currentUser.username)) {
    article.favorites.push(currentUser.username);
  }

  article.updatedAt = new Date().toISOString();

  articles[articleIndex] = article;
  await saveJsonData<Article>('articles', articles);

  const favorited = true;
  const favoritesCount = article.favorites.length;

  const responseArticle = {
    ...article,
    favorited,
    favoritesCount,
  };

  return NextResponse.json({ article: responseArticle }, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const currentUser = await getCurrentUser(req);
  if (!currentUser) {
    return NextResponse.json({ errors: { message: 'Unauthorized' } }, { status: 401 });
  }

  const articles = await loadJsonData<Article>('articles');
  const articleIndex = articles.findIndex((a) => a.slug === params.slug);

  if (articleIndex === -1) {
    return NextResponse.json({ errors: { message: 'Article not found' } }, { status: 404 });
  }

  const article = articles[articleIndex];

  if (!article.favorites) {
    article.favorites = [];
  }

  article.favorites = article.favorites.filter((username) => username !== currentUser.username);
  article.updatedAt = new Date().toISOString();

  articles[articleIndex] = article;
  await saveJsonData<Article>('articles', articles);

  const favorited = false;
  const favoritesCount = article.favorites.length;

  const responseArticle = {
    ...article,
    favorited,
    favoritesCount,
  };

  return NextResponse.json({ article: responseArticle }, { status: 200 });
}
