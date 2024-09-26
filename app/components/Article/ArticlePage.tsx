import React from 'react';
import ArticleBanner from './ArticleBanner';
import ArticleContent from './ArticleContent';
import ArticleMeta from './ArticleMeta';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: {
    username: string;
    image: string;
  };
}

const ArticlePage: React.FC = () => {
  // モックデータ
  const article = {
    title: 'How to build webapps that scale',
    body: `Web development technologies have evolved at an incredible clip over the past few years.

## Introducing RealWorld.

It's a great solution for learning how other frameworks work.`,
    createdAt: '2021-01-20T00:00:00.000Z',
    author: {
      username: 'Eric Simons',
      image: 'http://i.imgur.com/Qr71crq.jpg',
      bio: '',
      following: false,
    },
    favorited: false,
    favoritesCount: 29,
    tagList: ['realworld', 'implementations'],
  };

  const comments: Comment[] = [
    {
      id: 1,
      body: 'With supporting text below as a natural lead-in to additional content.',
      createdAt: '2021-12-29T00:00:00.000Z',
      author: {
        username: 'Jacob Schmidt',
        image: 'http://i.imgur.com/Qr71crq.jpg',
      },
    },
    // 必要に応じて他のコメントを追加
  ];

  return (
    <div className="article-page">
      <ArticleBanner article={article} />

      <div className="container page">
        <ArticleContent article={article} />

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>

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
