import React from 'react';
import ArticlePreview from './ArticlePreview';
import { Article } from '@types/article';

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
