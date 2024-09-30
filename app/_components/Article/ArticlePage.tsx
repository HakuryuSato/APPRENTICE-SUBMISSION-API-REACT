import React from 'react';
import ArticleBanner from './ArticleBanner';
import ArticleContent from './ArticleContent';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import type { Article } from '@custom-types/article';
import type { ArticleComment } from '@custom-types/article_comment';



interface ArticlePageProps {
  article: Article;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  const comments: ArticleComment[] = [
    {
      id: 1,
      body: 'With supporting text below as a natural lead-in to additional content.',
      createdAt: '2021-12-29T00:00:00.000Z',
      author: {
        username: 'Jacob Schmidt',
        image: 'http://i.imgur.com/Qr71crq.jpg',
      },
    },
  ];

  return (
    <div className="article-page">
      <ArticleBanner article={article} />

      <div className="container page">
        <ArticleContent article={article} />

        <hr />
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentForm />

            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
