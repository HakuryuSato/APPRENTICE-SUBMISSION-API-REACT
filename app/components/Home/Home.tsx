'use client';

'use client';

import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import ArticleList from './ArticleList';
import Pagination from './Pagination';
import TagList from './TagList';
import { getAllArticles } from '@utils/api';
import { Article } from '@types/article';

const ARTICLES_PER_PAGE = 10;

const Home: React.FC = () => {
  // 状態管理
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 総ページ数を計算
  const totalPages = Math.ceil(articlesCount / ARTICLES_PER_PAGE);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * ARTICLES_PER_PAGE;
        const response = await getAllArticles(offset, ARTICLES_PER_PAGE);
        setArticles(response.articles);
        setArticlesCount(response.articlesCount);
      } catch (err) {
        setError('記事の読み込みに失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

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
            {loading ? (
              <div>記事を読み込み中...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <ArticleList articles={articles} />
            )}

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
