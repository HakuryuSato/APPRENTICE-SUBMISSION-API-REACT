import React from 'react';
import ArticlePage from '@components/Article/ArticlePage';

interface ArticlePageProps {
  params: { slug: string };
}

export default function Page({ params }: ArticlePageProps) {
  const { slug } = params;
  // slug を使用して API から記事データを取得します

  return <ArticlePage />;
}
