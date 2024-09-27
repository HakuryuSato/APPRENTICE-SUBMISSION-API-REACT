import React from 'react';
import Image from 'next/image';
import { Article } from '@custom-types/article';

interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => (
  <div className="article-preview">
    <div className="article-meta">
      <a href={`/profile/${article.author.username}`}>
        {article.author.image ? (
          <Image
            src={article.author.image}
            alt={article.author.username}
            width={32}
            height={32}
          />
        ) : (
          // 画像がない場合のプレースホルダー
          <div style={{ width: 32, height: 32, backgroundColor: '#ccc' }} />
        )}
      </a>
      <div className="info">
        <a href={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </a>
        <span className="date">{new Date(article.createdAt).toDateString()}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {article.favoritesCount}
      </button>
    </div>
    <a href={`/article/${article.slug}`} className="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
      <ul className="tag-list">
        {article.tagList.map((tag) => (
          <li className="tag-default tag-pill tag-outline" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </a>
  </div>
);

export default ArticlePreview;
