import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@custom-types/article';
import { useAuth } from '@contexts/AuthContext';
import { favoriteArticle, unfavoriteArticle } from '@utils/api';

interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const { user } = useAuth();
  const { author, createdAt, favorited: initialFavorited, favoritesCount: initialFavoritesCount, slug } = article;

  const [favorited, setFavorited] = useState<boolean>(initialFavorited);
  const [favoritesCount, setFavoritesCount] = useState<number>(initialFavoritesCount);

  const favoriteButtonClass = favorited
    ? "btn btn-primary btn-sm pull-xs-right"
    : "btn btn-outline-primary btn-sm pull-xs-right";

  // お気に入りのトグル
  const handleFavorite = async () => {
    if (!user) {
      alert("ログインが必要です。");
      return;
    }

    try {
      if (!favorited) {
        const response = await favoriteArticle(slug);
        setFavorited(true);
        setFavoritesCount(response.article.favoritesCount);
      } else {
        const response = await unfavoriteArticle(slug);
        setFavorited(false);
        setFavoritesCount(response.article.favoritesCount);
      }
    } catch (error: unknown) {
      console.error("お気に入りの更新に失敗しました:", error);
      if (error instanceof Error) {
        alert(`お気に入りの更新に失敗しました: ${error.message}`);
      } else {
        alert("お気に入りの更新に失敗しました。");
      }
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link href={`/profile/${author.username}`}>
          {author.image ? (
            <Image
              src={author.image}
              alt={author.username}
              width={32}
              height={32}
            />
          ) : (
            // 画像がない場合のプレースホルダー
            <div style={{ width: 32, height: 32, backgroundColor: '#ccc' }} />
          )}
        </Link>
        <div className="info">
          <Link href={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>
        <button className={favoriteButtonClass} onClick={handleFavorite}>
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <Link href={`/article/${slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
