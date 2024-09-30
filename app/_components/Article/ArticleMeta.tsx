'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@custom-types/article";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { deleteArticle, favoriteArticle, unfavoriteArticle } from "@utils/api";

const ArticleMeta: React.FC<{ article: Article }> = ({ article }) => {
  const { user } = useAuth();
  const { author, createdAt, favorited: initialFavorited, favoritesCount: initialFavoritesCount, slug } = article;
  const router = useRouter();

  const [favorited, setFavorited] = useState<boolean>(initialFavorited);
  const [favoritesCount, setFavoritesCount] = useState<number>(initialFavoritesCount);

  const favoriteButtonClass = favorited
    ? "btn btn-sm btn-primary"
    : "btn btn-sm btn-outline-primary";

  const isAuthor = user && user.username === author.username;

  // 記事削除
  const handleDelete = async () => {
    const confirmDelete = window.confirm("この記事を削除しますか？");
    if (!confirmDelete) return;

    try {
      await deleteArticle(slug);
      alert("記事が削除されました。");
      router.push("/");
    } catch (error: unknown) {
      console.error("記事の削除に失敗しました:", error);
      if (error instanceof Error) {
        alert(`記事の削除に失敗しました: ${error.message}`);
      }
    }
  };

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
      }
    }
  };

  return (
    <div className="article-meta">
      <Link href={`/profile/${author.username}`}>
        {author.image && (
          <Image
            src={author.image}
            alt={author.username}
            width={32}
            height={32}
          />
        )}
      </Link>
      <div className="info">
        <Link href={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{new Date(createdAt).toDateString()}</span>
      </div>

      {/* フォローおよびお気に入りボタン */}
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow {author.username}
      </button>
      &nbsp;&nbsp;
      <button className={favoriteButtonClass} onClick={handleFavorite}>
        <i className="ion-heart"></i>
        &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
      </button>
      
      {/* ログイン中のユーザーが著者の場合にのみ表示 */}
      {isAuthor && (
        <>
          <Link href={`/editor/${slug}`}>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>
          </Link>
          &nbsp;
          <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </>
      )}
    </div>
  );
};

export default ArticleMeta;
