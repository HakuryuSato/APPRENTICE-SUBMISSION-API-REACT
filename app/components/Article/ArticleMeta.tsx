import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleMetaProps {
  article: {
    author: {
      username: string;
      image: string;
      following: boolean;
    };
    createdAt: string;
    favorited: boolean;
    favoritesCount: number;
  };
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
  const { author, createdAt, favorited, favoritesCount } = article;

  // favorited を仮に使用してボタンのスタイルを変更
  const favoriteButtonClass = favorited
    ? 'btn btn-sm btn-primary'
    : 'btn btn-sm btn-outline-primary';

  return (
    <div className="article-meta">
      <Link href={`/profile/${author.username}`}>
        <Image
          src={author.image}
          alt={author.username}
          width={32}
          height={32}
        />
      </Link>
      <div className="info">
        <Link href={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{new Date(createdAt).toDateString()}</span>
      </div>

      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow {author.username}
      </button>
      &nbsp;&nbsp;
      <button className={favoriteButtonClass}>
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{' '}
        <span className="counter">({favoritesCount})</span>
      </button>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-edit"></i> Edit Article
      </button>
      <button className="btn btn-sm btn-outline-danger">
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </div>
  );
};

export default ArticleMeta;
