import React from 'react';
import ArticleMeta from './ArticleMeta';

interface ArticleBannerProps {
  article: {
    title: string;
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

const ArticleBanner: React.FC<ArticleBannerProps> = ({ article }) => {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <ArticleMeta article={article} />
      </div>
    </div>
  );
};

export default ArticleBanner;
