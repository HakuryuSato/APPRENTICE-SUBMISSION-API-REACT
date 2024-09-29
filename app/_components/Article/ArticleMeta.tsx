'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@custom-types/article";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { deleteArticle } from "@utils/api";

const ArticleMeta: React.FC<{ article: Article }> = ({ article }) => {
  const { user } = useAuth(); // 現在のユーザー情報を取得
  const { author, createdAt, favorited, favoritesCount, slug } = article;
  const router = useRouter(); // ルーターのインスタンスを取得

  // favorited を仮に使用してボタンのスタイルを変更
  const favoriteButtonClass = favorited
    ? "btn btn-sm btn-primary"
    : "btn btn-sm btn-outline-primary";

  // 現在のユーザーが記事の著者であるかどうかを判定
  const isAuthor = user && user.username === author.username;

  // 記事削除ハンドラー
  const handleDelete = async () => {
    const confirmDelete = window.confirm("この記事を削除しますか？");
    if (!confirmDelete) return;

    try {
      await deleteArticle(slug);
      router.push("/"); // ホームページにリダイレクト
    } catch (error: unknown) { // any を unknown に変更
      console.error("記事の削除に失敗しました:", error);
      if (error instanceof Error) {
        alert(`記事の削除に失敗しました: ${error.message}`);
      } else {
        alert("記事の削除に失敗しました。");
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
      <button className={favoriteButtonClass}>
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
