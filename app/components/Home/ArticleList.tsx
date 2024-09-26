import React from 'react';
import ArticlePreview from './ArticlePreview';

interface Article {
  author: {
    username: string;
    image: string;
  };
  createdAt: string;
  favoritesCount: number;
  slug: string;
  title: string;
  description: string;
  tagList: string[];
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
  <>
    {articles.map((article) => (
      <ArticlePreview key={article.slug} article={article} />
    ))}
  </>
);

export default ArticleList;
