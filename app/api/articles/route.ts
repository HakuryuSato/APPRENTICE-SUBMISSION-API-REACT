import { NextResponse } from 'next/server';
import { loadJsonData, saveJsonData } from '@utils/vercel_kv_handler';
import type { Article } from '@/app/_custom-types/article';
import { getCurrentUser } from '@utils/auth';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

// 記事作成
export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, body: articleBody, tagList } = body.article || {};

  const currentUser = await getCurrentUser(req);

  if (!currentUser) {
    return NextResponse.json({ errors: { message: 'Unauthorized' } }, { status: 401 });
  }

  if (!title || !description || !articleBody) {
    return NextResponse.json({ errors: { message: 'Missing required fields' } }, { status: 422 });
  }

  const articles = await loadJsonData<Article>('articles');

  let slug = slugify(title, { lower: true, strict: true });

  if (articles.some((article) => article.slug === slug)) {
    slug = `${slug}-${uuidv4()}`;
  }


  const newArticle: Article = {
    slug,
    title,
    description,
    body: articleBody,
    tagList: tagList || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    favorited: false,
    favoritesCount: 0,
    favorites: [],
    author: {
      username: currentUser.username,
      bio: currentUser.bio || null,
      image: currentUser.image || null,
    },
  };


  articles.push(newArticle);
  await saveJsonData<Article>('articles', articles);

  return NextResponse.json({ article: newArticle }, { status: 201 });
}


// 記事一覧取得
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const tag = searchParams.get('tag');
  const author = searchParams.get('author');
  const favorited = searchParams.get('favorited');

  const currentUser = await getCurrentUser(req);

  const articles = await loadJsonData<Article>('articles');

  // フィルタリング
  let filteredArticles = articles;

  if (tag) {
    filteredArticles = filteredArticles.filter((article) =>
      article.tagList.includes(tag)
    );
  }

  if (author) {
    filteredArticles = filteredArticles.filter(
      (article) => article.author.username === author
    );
  }

  if (favorited) {
    filteredArticles = filteredArticles.filter((article) =>
      article.favorites.includes(favorited)
    );
  }

  // ページネーション
  const paginatedArticles = filteredArticles.slice(offset, offset + limit);

  // 現在のユーザーがお気に入り登録しているかどうかを設定
  const articlesWithFavorited = paginatedArticles.map((article) => {
    const favorited = currentUser
      ? article.favorites.includes(currentUser.username)
      : false;
    return {
      ...article,
      favorited,
      favoritesCount: article.favorites.length,
    };
  });

  return NextResponse.json({
    articles: articlesWithFavorited,
    articlesCount: filteredArticles.length,
  });
}