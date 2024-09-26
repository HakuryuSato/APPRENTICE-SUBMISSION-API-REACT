'use client';

import React, { useState } from 'react';
import Banner from './Banner';
import ArticleList from './ArticleList';
import Pagination from './Pagination';
import TagList from './TagList';

const Home: React.FC = () => {
  // ページネーションの現在のページを状態として管理
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2; // 実際にはAPIから取得

  // モックデータ（実際にはAPIからデータを取得します）
  const articles = [
    {
      author: {
        username: 'Eric Simons',
        image: 'http://i.imgur.com/Qr71crq.jpg',
      },
      createdAt: '2021-01-20T00:00:00.000Z',
      favoritesCount: 29,
      slug: 'how-to-build-webapps-that-scale',
      title: 'How to build webapps that scale',
      description: 'This is the description for the post.',
      tagList: ['realworld', 'implementations'],
    },
    {
      author: {
        username: 'Albert Pai',
        image: 'http://i.imgur.com/N4VcUeJ.jpg',
      },
      createdAt: '2021-01-20T00:00:00.000Z',
      favoritesCount: 32,
      slug: 'the-song-you',
      title: "The song you won't ever stop singing. No matter how hard you try.",
      description: 'This is the description for the post.',
      tagList: ['realworld', 'implementations'],
    },
  ];

  const tags = [
    'programming',
    'javascript',
    'emberjs',
    'angularjs',
    'react',
    'mean',
    'node',
    'rails',
  ];

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          {/* メインコンテンツ */}
          <div className="col-md-9">
            {/* フィードの切り替え */}
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            {/* 記事リスト */}
            <ArticleList articles={articles} />

            {/* ページネーション */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

          {/* サイドバー */}
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              {/* タグリスト */}
              <TagList tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
