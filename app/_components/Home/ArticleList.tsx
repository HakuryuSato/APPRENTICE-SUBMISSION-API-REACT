import React from 'react';
import ArticlePreview from './ArticlePreview';
import { Article } from '@/app/_custom-types/article';

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
  <>
    {articles.slice().reverse().map((article) => (
      <ArticlePreview key={article.slug} article={article} />
    ))}
  </>
);

export default ArticleList;
