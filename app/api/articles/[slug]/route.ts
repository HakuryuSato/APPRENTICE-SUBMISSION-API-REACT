import { NextResponse } from 'next/server';
import { loadJsonData, saveJsonData } from '@/app/utils/jsonStorageHandler';
import type { Article } from '@/app/types/article';
import { getCurrentUser } from '@/app/utils/auth';

// 単体記事取得
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const articles = await loadJsonData<Article>('articles');

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json({ article }, { status: 200 });
}


// 記事更新
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const body = await req.json();
  const { title, description, body: articleBody } = body.article || {};

  const currentUser = await getCurrentUser(req);
  if (!currentUser) {
    return NextResponse.json({ errors: { message: 'Unauthorized' } }, { status: 401 });
  }

  const articles = await loadJsonData<Article>('articles');

  const articleIndex = articles.findIndex((a) => a.slug === slug);

  if (articleIndex === -1) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  const article = articles[articleIndex];

  if (article.author.username !== currentUser.username) {
    return NextResponse.json({ errors: { message: 'Forbidden' } }, { status: 403 });
  }

  if (title) article.title = title;
  if (description) article.description = description;
  if (articleBody) article.body = articleBody;

  article.updatedAt = new Date().toISOString();

  articles[articleIndex] = article;
  await saveJsonData<Article>('articles', articles);

  return NextResponse.json({ article }, { status: 200 });
}

// 記事削除
export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const currentUser = await getCurrentUser(req);
  if (!currentUser) {
    return NextResponse.json({ errors: { message: 'Unauthorized' } }, { status: 401 });
  }

  const articles = await loadJsonData<Article>('articles');

  const articleIndex = articles.findIndex((a) => a.slug === slug);

  if (articleIndex === -1) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  const article = articles[articleIndex];

  if (article.author.username !== currentUser.username) {
    return NextResponse.json({ errors: { message: 'Forbidden' } }, { status: 403 });
  }

  articles.splice(articleIndex, 1);

  await saveJsonData<Article>('articles', articles);

  return NextResponse.json({ message: 'Article deleted' }, { status: 200 });
}
