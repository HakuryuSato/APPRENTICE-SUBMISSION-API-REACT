import { NextResponse } from 'next/server';
import { loadJsonData, saveJsonData } from '@utils/jsonStorageHandler';
import type { Article } from '@custom-types/article';
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
